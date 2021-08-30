const redis = require('redis')
const client = redis.createClient()
const helper = require('../../helpers/wrapper')
const bcrypt = require('bcrypt')
const authModel = require('./auth_model')
const { sendMail } = require('../../helpers/send_email')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { deleteImage } = require('../../helpers/delete_image')
// const nodemailer = require('nodemailer')

module.exports = {
  register: async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)

      const data = {
        user_email: userEmail,
        user_password: encryptPassword
      }

      const checkEmailUser = await authModel.getDataByCondition({
        user_email: userEmail
      })

      console.log(checkEmailUser)

      if (checkEmailUser.length === 0) {
        const result = await authModel.register(data)
        delete result.user_password

        const url = `http://localhost:3005/backend/api/v1/auth/verify-user/${result.id}`
        sendMail('Please activate your account', url, userEmail)

        return helper.response(
          res,
          200,
          'Succes register User Please Check your Email to Activate your Account !',
          result
        )
      } else {
        return helper.response(res, 400, 'Email has been registered')
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  login: async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body
      const checkEmailUser = await authModel.getDataByCondition({
        user_email: userEmail
      })

      if (checkEmailUser.length > 0) {
        if (checkEmailUser[0].user_verification === 0) {
          return helper.response(res, 403, 'Account is not verified')
        }

        const checkPassword = bcrypt.compareSync(
          userPassword,
          checkEmailUser[0].user_password
        )

        if (checkPassword) {
          const payload = {
            user_id: checkEmailUser[0].user_id,
            user_email: checkEmailUser[0].user_email,
            user_verification: checkEmailUser[0].user_verification,
            user_role: checkEmailUser[0].user_role
          }
          delete payload.user_password
          const token = jwt.sign({ ...payload }, process.env.PRIVATE_KEY, {
            expiresIn: '24h'
          })

          const result = { ...payload, token }
          return helper.response(res, 200, 'Succes Login !', result)
        } else {
          console.log('Wrong Password')
          return helper.response(res, 400, 'Wrong password')
        }
      } else {
        console.log('Email not Registered')
        return helper.response(res, 404, 'Email not Registerd')
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const result = await authModel.getAllData()
      if (result.length > 0) {
        client.set('getuserall', 3600, JSON.stringify(result))
        return helper.response(res, 200, 'Success Get All Data movie', result)
      } else {
        return helper.response(res, 404, 'Data Not Found', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params
    try {
      const result = await authModel.getUserDataById(id)
      if (result.length > 0) {
        client.set('getuserall', 3600, JSON.stringify(result))
        return helper.response(
          res,
          200,
          `Success Get User Data by Id ${id}`,
          result
        )
      } else {
        return helper.response(res, 404, 'Data Not Found', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params
      const { userName, userEmail, userPassword, userPhoneNumber } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)

      const checkUserData = await authModel.getDataByCondition({
        user_id: id
      })

      const setData = {
        user_name: userName,
        user_email: userEmail,
        user_password: encryptPassword,
        user_phone: userPhoneNumber,
        user_updated_at: new Date(Date.now())
      }

      // const originalHashedPassword = checkUserData[0].user_password

      // console.log(originalHashedPassword)
      // console.log(setData)

      if (checkUserData.length > 0) {
        const result = await authModel.updateData(setData, id)
        return helper.response(
          res,
          200,
          `Success Update User Data By Id: ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `User Data By Id ${id} Not Found`,
          null
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateUserImage: async (req, res) => {
    try {
      const { id } = req.params

      const checkUserData = await authModel.getDataByCondition({
        user_id: id
      })

      const setData = {
        user_profile_picture: req.file ? req.file.filename : '',
        user_updated_at: new Date(Date.now())
      }

      console.log(setData)
      if (checkUserData.length > 0) {
        const result = await authModel.updateUserImage(setData, {
          user_id: id
        })
        return helper.response(
          res,
          200,
          `Success Update User Image By Id: ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `User Data By Id ${id} Not Found`,
          null
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  changeUserVerification: async (req, res) => {
    try {
      let token = req.params.token
      let userId = ''
      let setData = {}
      // console.log(token)
      if (/^\d+$/.test(token)) {
        userId = token
        setData = { user_verified: 1 }
      } else {
        jwt.verify(token, process.env.PRIVATE_KEY, (error, result) => {
          if (
            (error && error.name === 'JsonWebTokenError') ||
            (error && error.name === 'TokenExpiredError')
          ) {
            return helper.response(res, 403, error.message)
          } else {
            // console.log('DECODE token', result)
            token = result
          }
        })
        userId = token.userId
        setData = token.setData
      }

      if (userId && setData) {
        // console.log('Update', setData)
        const result = await authModel.updateData(setData, userId)
        return helper.response(
          res,
          200,
          'succes update data',
          Object.keys(result)
        )
      } else {
        console.log('The Bad Request was from the Email')
        return helper.response(res, 400, 'Bad Request', null)
      }
    } catch (error) {
      console.log('Nope. The Bad Request was from the request itself')
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  changePassword: async (req, res) => {
    try {
      const { id } = req.params
      const { userPassword } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)

      const setData = {
        user_password: encryptPassword,
        user_updated_at: new Date(Date.now())
      }

      const checkUserData = await authModel.getDataByCondition({
        user_id: id
      })

      if (checkUserData.length > 0) {
        const result = await authModel.changePassword(setData, {
          user_id: id
        })
        return helper.response(
          res,
          200,
          `Success Change User Password By Id: ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `User Data By Id ${id} Not Found`,
          null
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params
      const checkUserData = await authModel.getDataByCondition({
        user_id: id
      })
      if (checkUserData.length > 0) {
        const result = await authModel.deleteData(id)
        return helper.response(
          res,
          200,
          `Success Delete User Data By id: ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `movie Data By Id ${id} Not Found`,
          null
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteUserImage: async (req, res) => {
    try {
      const id = req.params.id
      const checkUserData = await authModel.getDataByCondition({ user_id: id })
      const setDeleteImage = {
        user_profile_picture: '',
        user_updated_at: new Date(Date.now())
      }
      if (checkUserData.length > 0) {
        deleteImage(
          `src/uploads/jualkarcis_uploads/${checkUserData[0].user_profile_picture}`
        )
        const result = await authModel.updateData(setDeleteImage, {
          user_id: id
        })
        return helper.response(
          res,
          200,
          `Sucess Delete User Image by: ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `User Data By Id ${id} Not Found`,
          null
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}

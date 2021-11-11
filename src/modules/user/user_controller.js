const helper = require('../../helpers/wrapper')
const redis = require('redis')
const client = redis.createClient()
const bcrypt = require('bcrypt')
const userModel = require('./user_model')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { deleteImage } = require('../../helpers/delete_image')

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const result = await userModel.getAllData()
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
      const result = await userModel.getDataByCondition({ user_id: id })
      if (result.length > 0) {
        client.setex(`getuser:${id}`, 3600, JSON.stringify(result))
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
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params
      const { userName, userEmail, userPassword, userPhoneNumber } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)

      const checkUserData = await userModel.getDataByCondition({
        user_id: id
      })

      const setData = {
        user_name: userName,
        user_email: userEmail,
        user_password: encryptPassword,
        user_phone: userPhoneNumber,
        user_updated_at: new Date(Date.now())
      }
      if (checkUserData.length > 0) {
        const result = await userModel.updateData(setData, { user_id: id })
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

      const checkUserData = await userModel.getDataByCondition({
        user_id: id
      })

      const setData = {
        user_profile_picture: req.file ? req.file.filename : '',
        user_updated_at: new Date(Date.now())
      }

      console.log(setData)
      if (checkUserData.length > 0) {
        const result = await userModel.updateUserImage(setData, {
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
        const result = await userModel.updateData(setData, userId)
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

      const checkUserData = await userModel.getDataByCondition({
        user_id: id
      })

      if (checkUserData.length > 0) {
        const result = await userModel.updateData(setData, {
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
      const checkUserData = await userModel.getDataByCondition({
        user_id: id
      })
      if (checkUserData.length > 0) {
        const result = await userModel.deleteData(id)
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
      const checkUserData = await userModel.getDataByCondition({ user_id: id })
      const setDeleteImage = {
        user_profile_picture: '',
        user_updated_at: new Date(Date.now())
      }
      if (checkUserData.length > 0) {
        deleteImage(
          `src/uploads/jualkarcis_uploads/${checkUserData[0].user_profile_picture}`
        )
        const result = await userModel.updateData(setDeleteImage, {
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

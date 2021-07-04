const helper = require('../../helpers/wrapper')
const bcrypt = require('bcrypt')
const authModel = require('./premiere_model')
const { sendMail } = require('../../helpers/send_email')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  newpremiere: async (req, res) => {
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
        console.log(result)
        // const url = `http://localhost:3005/backend5/api/v1/auth/change-data/${result.id}`
        // sendMail('Please activate your account', url, userEmail)

        return helper.response(res, 200, 'Succes register User !', result)
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
          return helper.response(res, 400, 'Wrong password')
        }
      } else {
        return helper.response(res, 404, 'Email not Registerd')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  changeData: async (req, res) => {
    try {
      const { id } = req.params
      const { userName, userEmail, userPassword } = req.body
      const checkUserData = await authModel.getDataByCondition({
        user_id: id
      })
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)

      const setData = {
        user_name: userName,
        user_email: userEmail,
        user_password: encryptPassword,
        user_updated_at: new Date(Date.now())
      }
      if (checkUserData.length > 0) {
        const result = await authModel.updateData(setData, {
          user_id: id
        })
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

  requestChangePassword: async (req, res) => {
    try {
      if (req.body.userPassword) {
        const salt = bcrypt.genSaltSync(10)
        const encryptPassword = bcrypt.hashSync(req.body.userPassword, salt)
        req.body.userPassword = encryptPassword

        const user = await authModel.getDataCondition({
          user_email: req.body.userEmail
        })

        const payload = {
          userId: user[0].user_id,
          setData: { user_password: encryptPassword }
        }

        // console.log(payload)
        const token = jwt.sign({ ...payload }, process.env.PRIVATE_KEY, {
          expiresIn: '1h'
        })

        const url = `http://localhost:3005/backend5/api/v1/auth/change-data/${token}`

        // send email for verificatioan here
        sendMail('Confirm your change password', url, req.body.userEmail)

        return helper.response(
          res,
          200,
          'Email verification has been sent, please check your email !',
          null
        )
      } else {
        const checkEmailUser = await authModel.getDataByCondition({
          user_email: req.body.userEmail
        })
        if (checkEmailUser.length > 0) {
          return helper.response(res, 200, 'Email found !', null)
        } else {
          return helper.response(res, 404, 'Email not found !', null)
        }
      }
    } catch (error) {
      // console.log(error)
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
  }
}

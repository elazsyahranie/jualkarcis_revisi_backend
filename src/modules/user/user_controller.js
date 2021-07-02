const helper = require('../../helpers/wrapper')
const bcrypt = require('bcrypt')
const userModel = require('./user_model')
const { deleteImage } = require('../../helpers/delete_image')

module.exports = {
  getUserDataByid: async (req, res) => {
    try {
      const { id } = req.params
      const result = await userModel.geDataByCondition({ user_id: id })
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          `Success Get User Data By Id: ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `User Data By Id: ${id} Not Found`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateUserData: async (req, res) => {
    try {
      const { id } = req.params
      let {
        userEmail,
        userPhone,
        userAddress,
        userDisplayName,
        userFirstName,
        userLastName,
        userBirthday,
        userGender
      } = req.body
      if (userBirthday !== undefined) {
        userBirthday = userBirthday.split('/').reverse().join('/')
      }
      const checkUserData = await userModel.geDataByCondition({ user_id: id })
      const setData = {
        user_email:
          userEmail !== undefined ? userEmail : checkUserData[0].user_email,
        user_phone:
          userPhone !== undefined ? userPhone : checkUserData[0].user_phone,
        user_address:
          userAddress !== undefined
            ? userAddress
            : checkUserData[0].user_address,
        user_display_name:
          userDisplayName !== undefined
            ? userDisplayName
            : checkUserData[0].user_display_name,
        user_first_name:
          userFirstName !== undefined
            ? userFirstName
            : checkUserData[0].user_first_name,
        user_last_name:
          userLastName !== undefined
            ? userLastName
            : checkUserData[0].user_last_name,
        user_birthday:
          userBirthday !== undefined
            ? userBirthday
            : checkUserData[0].user_birthday,
        user_gender:
          userGender !== undefined ? userGender : checkUserData[0].user_gender,
        user_image: req.file ? req.file.filename : checkUserData[0].user_image,
        user_updated_at: new Date(Date.now())
      }

      if (checkUserData.length > 0) {
        if (req.file) {
          deleteImage(`src/uploads/${checkUserData[0].user_image}`)
        }
        const result = await userModel.updateData(setData, { user_id: id })
        return helper.response(
          res,
          200,
          `Success Update Contact User By Id: ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `User Data By Id: ${id} Not Found`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateUserPassword: async (req, res) => {
    try {
      const { id } = req.params
      const { userPassword } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)
      const checkUserData = await userModel.geDataByCondition({ user_id: id })
      if (checkUserData.length === 0) {
        return helper.response(
          res,
          404,
          `User Data By Id: ${id} Not Found`,
          null
        )
      }

      const result = await userModel.updateData(
        { user_password: encryptPassword },
        { user_id: id }
      )
      return helper.response(
        res,
        200,
        `Success Update Password User By Id: ${id}`,
        result
      )
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteUserImage: async (req, res) => {
    try {
      const id = req.params.id
      const checkUserData = await userModel.geDataByCondition({ user_id: id })
      const setDeleteImage = {
        user_image: '',
        user_updated_at: new Date(Date.now())
      }
      if (checkUserData.length > 0) {
        deleteImage(`src/uploads/${checkUserData[0].user_image}`)
        const result = await userModel.updateData(setDeleteImage, {
          user_id: id
        })
        return helper.response(
          res,
          200,
          `Sucess Delete User Data By Id: ${id}`,
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
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}

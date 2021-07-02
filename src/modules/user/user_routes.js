const express = require('express')
const Route = express.Router()
const uploads = require('../../middleware/uploads')
const { authentication } = require('../../middleware/auth')

const {
  getUserDataByid,
  updateUserData,
  deleteUserImage,
  updateUserPassword
} = require('./user_controller')

Route.get('/:id', authentication, getUserDataByid)
Route.patch('/:id', authentication, uploads, updateUserData)
Route.get('/delete-image/:id', authentication, deleteUserImage)
Route.patch('/change-password/:id', authentication, updateUserPassword)

module.exports = Route

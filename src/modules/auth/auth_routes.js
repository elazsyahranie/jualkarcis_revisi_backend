const express = require('express')
const Route = express.Router()
// const authController = require('./auth_controller')
const uploads = require('../../middleware/uploads')
const { authentication } = require('../../middleware/auth')

const { getAllUserByRedis } = require('../../middleware/redis')

const {
  login,
  register,
  getAllUsers,
  updateUser,
  changeUserVerification,
  deleteUser,
  deleteUserImage
} = require('./auth_controller')

Route.post('/login', login)
Route.post('/register', register)
Route.patch('/:id', authentication, uploads, updateUser)
Route.get('/', getAllUserByRedis, getAllUsers)
Route.get('/verify-user/:token', changeUserVerification)
Route.delete('/:id', authentication, deleteUser)
Route.delete('/delete-image/:id', authentication, deleteUserImage)

// Route.get('/change-data/:token', authController.changeData)
// Route.post('/request-change-password', authController.requestChangePassword)

module.exports = Route

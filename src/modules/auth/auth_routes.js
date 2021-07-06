const express = require('express')
const Route = express.Router()
// const authController = require('./auth_controller')
const { authentication } = require('../../middleware/auth')

const {
  login,
  register,
  changeData,
  changeUserVerification,
  deleteUser
} = require('./auth_controller')

Route.post('/login', login)
Route.post('/register', register)
Route.patch('/:id', authentication, changeData)
Route.get('/verify-user/:token', changeUserVerification)
Route.delete('/:id', authentication, deleteUser)

// Route.get('/change-data/:token', authController.changeData)
// Route.post('/request-change-password', authController.requestChangePassword)

module.exports = Route

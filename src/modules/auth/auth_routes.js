const express = require('express')
const Route = express.Router()
const authController = require('./auth_controller')

Route.post('/login', authController.login)
Route.post('/register', authController.register)

Route.get('/change-data/:token', authController.changeData)
Route.post('/request-change-password', authController.requestChangePassword)

module.exports = Route

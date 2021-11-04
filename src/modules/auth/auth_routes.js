const express = require('express')
const Route = express.Router()
//
const { login, register } = require('./auth_controller')

Route.post('/login', login)
Route.post('/register', register)

// Route.get('/change-data/:token', authController.changeData)
// Route.post('/request-change-password', authController.requestChangePassword)

module.exports = Route

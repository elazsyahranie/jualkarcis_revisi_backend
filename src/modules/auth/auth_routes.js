const express = require('express')
const Route = express.Router()
// const authController = require('./auth_controller')

const { login, register, changeData, deleteUser } = require('./auth_controller')

Route.post('/login', login)
Route.post('/register', register)
Route.patch('/:id', changeData)
Route.delete('/:id', deleteUser)

// Route.get('/change-data/:token', authController.changeData)
// Route.post('/request-change-password', authController.requestChangePassword)

module.exports = Route

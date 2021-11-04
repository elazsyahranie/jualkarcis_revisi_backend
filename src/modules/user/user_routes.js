const express = require('express')
const Route = express.Router()
const uploads = require('../../middleware/uploads')
const { authentication } = require('../../middleware/auth')

const { getAllUserByRedis } = require('../../middleware/redis')

const {
  getAllUsers,
  getUserById,
  updateUser,
  updateUserImage,
  changePassword,
  changeUserVerification,
  deleteUser,
  deleteUserImage
} = require('./user_controller')

Route.patch('/:id', authentication, uploads, updateUser)
Route.patch('/updateImage/:id', authentication, uploads, updateUserImage)
Route.patch('/change-password/:id', authentication, changePassword)
Route.get('/', getAllUserByRedis, getAllUsers)
Route.get('/:id', getUserById)
Route.get('/verify-user/:token', changeUserVerification)
Route.delete('/:id', authentication, deleteUser)
Route.delete('/delete-image/:id', authentication, deleteUserImage)
Route.get('/delete-image/:id', authentication, deleteUserImage)
module.exports = Route

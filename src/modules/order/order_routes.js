const express = require('express')
const Route = express.Router()
const { authentication } = require('../../middleware/auth')

const {
  getAllOrderByUserId,
  deleteOrderDataById
} = require('./order_controller')

Route.get('/:id', authentication, getAllOrderByUserId)
Route.delete('/:id', authentication, deleteOrderDataById)

module.exports = Route

const express = require('express')
const Route = express.Router()
// const authController = require('./auth_controller')

const {
  newpremiere,
  updatePremiere,
  deletePremiere
} = require('./auth_controller')

Route.post('/newpremiere', newpremiere)
Route.patch('/:id', updatePremiere)
Route.delete('/:id', deletePremiere)

// Route.get('/change-data/:token', authController.changeData)
// Route.post('/request-change-password', authController.requestChangePassword)

module.exports = Route

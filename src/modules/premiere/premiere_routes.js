const express = require('express')
const Route = express.Router()
// const authController = require('./auth_controller')

const {
  newpremiere,
  getMovieDataId,
  getpremiereById,
  updatePremiere,
  deletePremiere
} = require('./premiere_controller')

Route.post('/premiere', newpremiere)
Route.get('/premiere_movie/:id', getMovieDataId)
Route.get('/:id', getpremiereById)
Route.patch('/:id', updatePremiere)
Route.delete('/:id', deletePremiere)

// Route.get('/change-data/:token', authController.changeData)
// Route.post('/request-change-password', authController.requestChangePassword)

module.exports = Route

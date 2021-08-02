const express = require('express')
const Route = express.Router()
// const authController = require('./auth_controller')

const {
  newbooking,
  newbookingseat,
  getMovieDataId,
  getBookingById,
  updatePremiere,
  deletePremiere
} = require('./booking_controller')

Route.post('/booking', newbooking)
Route.post('/booking-seat', newbookingseat)
Route.get('/premiere_movie/:id', getMovieDataId)
Route.get('/:movieId', getBookingById)
Route.patch('/:id', updatePremiere)
Route.delete('/:id', deletePremiere)

// Route.get('/change-data/:token', authController.changeData)
// Route.post('/request-change-password', authController.requestChangePassword)

module.exports = Route

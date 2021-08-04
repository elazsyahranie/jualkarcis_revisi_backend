const express = require('express')
const Route = express.Router()
// const authController = require('./auth_controller')

const {
  newbooking,
  newbookingseat,
  getMovieDataId,
  getBookingByMovieId,
  getBookingByBookingId,
  getBookingSeatByMovieId,
  getBookingSeatByBookingId,
  updateBooking,
  deletePremiere
} = require('./booking_controller')

Route.post('/booking', newbooking)
Route.post('/booking-seat', newbookingseat)
Route.get('/premiere_movie/:id', getMovieDataId)
Route.get('/:movieId', getBookingByMovieId)
Route.get('/bookingId/:bookingId', getBookingByBookingId)
Route.get('/booking-seat-movie-id/:movieId', getBookingSeatByMovieId)
Route.get('/booking-seat-booking-id/:bookingId', getBookingSeatByBookingId)
Route.patch('/:id', updateBooking)
Route.delete('/:id', deletePremiere)

// Route.get('/change-data/:token', authController.changeData)
// Route.post('/request-change-password', authController.requestChangePassword)

module.exports = Route

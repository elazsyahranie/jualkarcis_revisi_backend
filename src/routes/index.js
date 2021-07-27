const express = require('express')
const Route = express.Router()
const authRouter = require('../modules/auth/auth_routes')
const movieRouter = require('../modules/movie/movie_routes')
const userRouter = require('../modules/user/user_routes')
const premiereRouter = require('../modules/premiere/premiere_routes')
const bookingRouter = require('../modules/booking/booking_routes')
const locationRouter = require('../modules/location/location_routes')
const showTimeRouter = require('../modules/show_time/show_time_routes')

Route.use('/auth', authRouter)
Route.use('/movie', movieRouter)
Route.use('/user', userRouter)
Route.use('/premiere', premiereRouter)
Route.use('/booking', bookingRouter)
Route.use('/location', locationRouter)
Route.use('/show-time', showTimeRouter)

module.exports = Route

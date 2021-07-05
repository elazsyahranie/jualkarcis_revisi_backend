const express = require('express')
const Route = express.Router()
const authRouter = require('../modules/auth/auth_routes')
const movieRouter = require('../modules/movie/movie_routes')
const userRouter = require('../modules/user/user_routes')

Route.use('/auth', authRouter)
Route.use('/movie', movieRouter)
Route.use('/user', userRouter)

module.exports = Route

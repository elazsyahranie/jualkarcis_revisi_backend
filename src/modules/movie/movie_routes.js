const express = require('express')
const Route = express.Router()
const uploads = require('../../middleware/uploads')
const { authentication } = require('../../middleware/auth')

const {
  getMovieByIdRedis,
  getAllMovieByPaginationAndRedis,
  getAllMovieByRedis
} = require('../../middleware/redis')

const {
  createmovie,
  getAllMovie,
  getAllMoviePagination,
  getmovieDataById,
  updatemovieData,
  deletemovie
} = require('./movie_controller')

Route.post('/', uploads, createmovie)
Route.get('/', authentication, getAllMovieByRedis, getAllMovie)
Route.get(
  '/pagination',
  authentication,
  // getAllMovieByPaginationAndRedis,
  getAllMoviePagination
)
Route.get('/:id', authentication, getMovieByIdRedis, getmovieDataById)
Route.patch('/:id', authentication, uploads, updatemovieData)
Route.delete('/:id', authentication, deletemovie)

module.exports = Route

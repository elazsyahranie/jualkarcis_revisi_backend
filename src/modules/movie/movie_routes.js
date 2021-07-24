const express = require('express')
const Route = express.Router()
const uploads = require('../../middleware/uploads')
const { authentication, isAdmin } = require('../../middleware/auth')

const {
  getMovieByIdRedis,
  getPremiereofMovieByIdRedis,
  getAllMovieByRedis
} = require('../../middleware/redis')

const {
  createmovie,
  getAllMovie,
  getAllMoviePagination,
  getmovieDataById,
  updatemovieData,
  updateMovieImage,
  deletemovie,
  deleteMovieImage
} = require('./movie_controller')

Route.post('/', uploads, createmovie)
Route.get('/', authentication, getAllMovieByRedis, getAllMovie)
Route.get(
  '/pagination',
  authentication,
  // getAllMovieByPaginationAndRedis,
  getAllMoviePagination
)
Route.get(
  '/:id',
  authentication,
  // getMovieByIdRedis,
  // getPremiereofMovieByIdRedis,
  getmovieDataById
)
Route.patch('/:id', authentication, isAdmin, uploads, updatemovieData)
Route.patch(
  '/update-movie-image/:id',
  authentication,
  uploads,
  updateMovieImage
)
Route.delete('/:id', authentication, isAdmin, deletemovie)
Route.delete(
  '/delete-movie-image/:id',
  authentication,
  isAdmin,
  deleteMovieImage
)

module.exports = Route

const express = require('express')
const Route = express.Router()
const uploads = require('../../middleware/uploads')
const { authentication, isAdmin } = require('../../middleware/auth')

const {
  getMovieByIdRedis,
  getAllMovieByPaginationAndRedis,
  // getPremiereofMovieByIdRedis,
  getAllMovieByRedis,
  clearDataMovieRedis
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

Route.post('/', uploads, clearDataMovieRedis, createmovie)
Route.get('/', authentication, getAllMovieByRedis, getAllMovie)
Route.get(
  '/pagination',
  authentication,
  getAllMovieByPaginationAndRedis,
  getAllMoviePagination
)
Route.get(
  '/:id',
  authentication,
  getMovieByIdRedis,
  // getPremiereofMovieByIdRedis,
  getmovieDataById
)
Route.patch(
  '/:id',
  authentication,
  isAdmin,
  uploads,
  clearDataMovieRedis,
  updatemovieData
)
Route.patch(
  '/update-movie-image/:id',
  authentication,
  isAdmin,
  uploads,
  clearDataMovieRedis,
  updateMovieImage
)
Route.delete('/:id', authentication, isAdmin, clearDataMovieRedis, deletemovie)
Route.delete(
  '/delete-movie-image/:id',
  authentication,
  isAdmin,
  clearDataMovieRedis,
  deleteMovieImage
)

module.exports = Route

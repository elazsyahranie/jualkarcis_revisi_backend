const express = require('express')
const Route = express.Router()
const uploads = require('../../middleware/uploads')
const { authentication } = require('../../middleware/auth')

const {
  createmovie,
  getAllMovie,
  getAllMoviePagination,
  getmovieDataById,
  updatemovieData,
  deletemovie
} = require('./movie_controller')

Route.post('/', uploads, createmovie)
Route.get('/', authentication, getAllMovie)
Route.get('/pagination', authentication, getAllMoviePagination)
Route.get('/:id', authentication, getmovieDataById)
Route.patch('/:id', authentication, uploads, updatemovieData)
Route.delete('/:id', authentication, deletemovie)

module.exports = Route

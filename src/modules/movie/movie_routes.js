const express = require('express')
const Route = express.Router()
const uploads = require('../../middleware/uploads')
// const authMiddleware = require('../../middleware/auth')

const {
  createmovie,
  getAllMovie,
  getmovieDataById,
  updatemovieData,
  deletemovie
} = require('./movie_controller')

Route.post('/', uploads, createmovie)
Route.get('/', getAllMovie)
Route.get('/:id', getmovieDataById)
Route.patch('/:id', uploads, updatemovieData)
Route.delete('/:id', deletemovie)

module.exports = Route

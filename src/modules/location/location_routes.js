const express = require('express')
const Route = express.Router()

const { getLocationDataId, getAllLocation } = require('./location_controller')

Route.get('/:id', getLocationDataId)
Route.get('/', getAllLocation)
module.exports = Route

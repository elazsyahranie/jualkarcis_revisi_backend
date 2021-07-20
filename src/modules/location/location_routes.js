const express = require('express')
const Route = express.Router()

const { getLocationDataId } = require('./location_controller')

Route.get('/:id', getLocationDataId)
module.exports = Route

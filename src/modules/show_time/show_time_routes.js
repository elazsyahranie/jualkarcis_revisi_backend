const express = require('express')
const Route = express.Router()
const { allShowTime } = require('./show_time_controller')

Route.get('/', allShowTime)

module.exports = Route

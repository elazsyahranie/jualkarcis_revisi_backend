const express = require('express')
const Route = express.Router()
const { authentication, isAdmin } = require('../../middleware/auth')
const { chartDaily } = require('./chart_controller')

Route.get('/daily', authentication, isAdmin, chartDaily)

module.exports = Route

const express = require('express')
const Route = express.Router()
const promoController = require('./promo_controller')
const uploads = require('../../middleware/uploads')
const authMiddleware = require('../../middleware/auth')

Route.get('/', authMiddleware.authentication, promoController.getAllPromo)
Route.get('/:id', authMiddleware.authentication, promoController.getPromoById)
Route.post(
  '/',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  uploads,
  promoController.createPromo
)
Route.patch(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  uploads,
  promoController.updatePromo
)
Route.delete(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  promoController.deletePromo
)

module.exports = Route

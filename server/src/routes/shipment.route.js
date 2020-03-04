import express from 'express'
import ShipmentController from '../controllers/shipment/index'
import { check } from 'express-validator'
import rut from 'validar-rut'

var api = express.Router()

api.post('/createshipment', [
  check('description', 'description is requried')
    .isLength({min: 3, max: 40}),
  check('name', 'name is requried')
    .isLength({min: 3, max: 40}),
  check('rut', 'rut is requried').custom(value => {
      return rut.validar(String(value).toUpperCase());
    }),
  check('dep', 'dep is requried')
    .isLength({min: 1, max: 4}),
  ],
  ShipmentController.createshipment)

api.get('/getShipmentsBuild', ShipmentController.getShipmentsBuild)

export default api
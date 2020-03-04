import express from 'express'
import VisitController from '../controllers/visit/index'
import { check } from 'express-validator'
import rut from 'validar-rut'

var api = express.Router()

api.post('/createVisit', [
  check('person', 'person is requried').custom(value => {
    return rut.validar(String(value).toUpperCase());
  }),
  check('depto', 'dep is requried')
    .isLength({min: 1, max: 4}),
  ],
  VisitController.createVisit)

api.get('/getVisitBuild', VisitController.getVisitBuild)

export default api
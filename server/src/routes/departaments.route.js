import express from 'express'
import DepartamentsController from '../controllers/departaments/index'
import { check } from 'express-validator'

var api = express.Router()

api.post('/createDepartaments', [
    check('num', 'name is required')
      .isLength({min: 1}),
    check('build', 'build is required')
      .isLength({min: 20, max: 40})
    ],
    DepartamentsController.createDepartaments)

api.post('/departaments', DepartamentsController.getDepartaments)

export default api
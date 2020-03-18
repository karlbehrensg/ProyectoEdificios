import express from 'express'
import BuilController from '../controllers/building/index'
import { check } from 'express-validator'

var api = express.Router()

api.post('/createBuild', [
  check('title', 'name is required')
    .isLength({min: 5, max: 30}),
  ],
  BuilController.createbuilding)

api.get('/buildings', BuilController.getBuildings)

export default api
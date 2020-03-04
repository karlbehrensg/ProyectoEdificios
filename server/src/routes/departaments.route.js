import express from 'express'
import DepartamentsController from '../controllers/departaments/index'

var api = express.Router()

api.post('/departaments', DepartamentsController.getDepartaments)

export default api
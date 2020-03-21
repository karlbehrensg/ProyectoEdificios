import express from 'express'
import PersonController from '../controllers/person/index'
import { check } from 'express-validator'
import rut from 'validar-rut'

var api = express.Router()

api.post('/createPersonDep', [
  check('rut', 'rut is requried').custom(value => {
    return rut.validar(String(value).toUpperCase());
  }),
  check('email', 'Email is required')
    .isEmail(),
  check('name', 'Name is requried')
    .isLength({min: 3, max: 10}),
  check('lastName', 'lastName is requried')
    .isLength({min: 3, max: 10}),
  check('phone', 'Phone is requried')
    .isLength({ min: 8 }),
  check('dep', 'dep is requried')
    .isLength({min: 2, max: 5}),
  ],
  PersonController.createPersonDep)

api.post('/createPersonVisit', [
  check('rut', 'rut is requried').custom(value => {
    return rut.validar(String(value).toUpperCase());
  }),
  check('name', 'Name is requried')
    .isLength({min: 3, max: 10}),
  check('patent', 'Format patent')
    .optional()
    .isLength({min: 0, max: 15}),
  check('lastName', 'lastName is requried')
    .isLength({min: 3, max: 10}),
  check('dep', 'dep is requried')
    .isLength({min: 2, max: 5}),
  ], 
  PersonController.createPersonVisit)

api.post('/getPerponsBuild', PersonController.getPersponsBuild)

api.post('/createCommentPerson', [
  check('desc', 'description is requried')
    .isLength({min: 1, max: 100}),
  check('person', 'id person is requried')
    .isLength({min: 10, max: 30}),
  ],
  PersonController.createPersonVisitComment)

api.post('/inactiveComment', [
  check('comment', 'id comment is requried')
    .isLength({min: 10, max: 30}),
  check('state', 'state is required')
    .isBoolean(),
  ],
  PersonController.inactiveCommentPerson)

api.post('/getCommentPerson', [
  check('person', 'id person is requried')
    .isLength({min: 10, max: 30}),
  ],
  PersonController.getCommentPerson)



export default api
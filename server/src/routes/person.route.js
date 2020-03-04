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

//api.post('/getPersonsDepsBuild', PersonController.getPersonsDepsBuild)
api.post('/getPerponsBuild', PersonController.getPersponsBuild)

export default api
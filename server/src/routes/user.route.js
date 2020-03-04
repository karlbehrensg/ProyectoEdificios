import express from 'express'
import UserController from '../controllers/user/index'
import { check } from 'express-validator'

var api = express.Router()

api.post('/createUser', [
    check('name', 'Name is requried')
      .isLength({min: 3, max: 10}),
    check('email', 'Email is required')
      .isEmail(),
    check('password', 'Password is requried')
      .isLength({ min: 4 })
  ], 
  UserController.createUser)

api.post('/login', [
    check('email', 'Email is required')
      .isLength({ min: 4, max: 30 }),
    check('password', 'Password is requried')
      .isLength({ min: 4 })
  ],
  UserController.login)

export default api
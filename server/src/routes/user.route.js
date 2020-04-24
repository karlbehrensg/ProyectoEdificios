import express from 'express'
import UserController from '../controllers/user/index'
import { check } from 'express-validator'

var api = express.Router()

api.post('/createUser', [
    check('name', 'Name is requried')
      .isLength({min: 3, max: 20}),
    check('email', 'Email is required')
      .isEmail(),
    check('password', 'Password is requried')
      .isLength({ min: 4 }),
    check('build', 'build is required')
      .isLength({min: 20, max: 40})
  ], 
  UserController.createUser)

api.post('/createUserBuild', [
    check('name', 'Name is requried')
      .isLength({min: 3, max: 20}),
    check('email', 'Email is required')
      .isEmail(),
    check('password', 'Password is requried')
      .isLength({ min: 4 }),
    check('build', 'build is required')
      .isLength({min: 20, max: 40})
  ], 
  UserController.createUserBuild)

api.post('/login', [
    check('email', 'Email is required')
      .isLength({ min: 4, max: 30 }),
    check('password', 'Password is requried')
      .isLength({ min: 4 })
  ],
  UserController.login)

api.post('/setStateUser', [
    check('state', 'state is required')
      .isBoolean(),
    check('user', 'user is requried')
  ],
  UserController.inactiveUser)

api.post('/logout', [
    check('user', 'User is requried')
      .isLength({ min: 4 })
],
UserController.logout)

//api.get('/getUsers', UserController.getUsers)

api.get('/getUsersBuild', UserController.getUsersBuild)

export default api
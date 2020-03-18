import { prisma } from '../../../generated/prisma-client'
import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import getUser from '../../services/getUser.services'

const createUserBuild = (req, res) => {

  const user = getUser(req.headers.authorization)

  if(!user) res.status(500).send({msg: "Usuario no autenticado"})

  if(user.role != "ADMIN") res.status(500).send({msg: "Usuario no autorizado"})

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(500).jsonp(errors.array());
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, async (err, hash) => {
      const user = await prisma.createUser({
        email: req.body.email,
        username: req.body.name,
        password: hash,
      })
      
      if (user) res.status(200).send({msg: "Usuario Creado"})
      else res.status(500).send({msg: "Error al crear el Usuario"})
    });
  });
}

export default createUserBuild
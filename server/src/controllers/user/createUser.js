import { prisma } from '../../../generated/prisma-client'
import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'

const createUser = (req, res) => {

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

export default createUser
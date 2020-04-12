import { prisma } from '../../../generated/prisma-client'
import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import getUser from '../../services/getUser.services'

const createUser = async (req, res) => {

  const user = getUser(req.headers.authorization)

  if(!user) return res.status(500).send({msg: "Usuario no autenticado"})

  if(user.role != "SUPERADMIN") return res.status(500).send({msg: "Usuario no autorizado"})

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(500).jsonp(errors.array());
  }

  const valideUserEmail = await prisma.user({email: req.body.email})

  if(valideUserEmail) return res.status(500).send({msg: "Correo electronico ya existe"})

  const valideUserUsername = await prisma.user({username: req.body.name})

  if(valideUserUsername) return res.status(500).send({msg: "Nombre de usuario ya existe"})

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, async (err, hash) => {
      const user = await prisma.createUser({
        email: req.body.email,
        username: req.body.name,
        password: hash,
        role: "ADMIN",
        build: {
          connect: { id: req.body.build }
        }
      })
      
      if (user) return res.status(200).send({msg: "Usuario Creado"})
      else return res.status(500).send({msg: "Error al crear el Usuario"})
    });
  });
}

export default createUser
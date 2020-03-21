import jwt from '../../services/jwt.service'
import bcrypt from 'bcryptjs'
import { prisma } from '../../../generated/prisma-client'
import { validationResult } from 'express-validator'

const login = async (req, res) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(500).jsonp(errors.array());
  }

  var user = await prisma.user( { email: req.body.email } )

  if(!user) {

    user = await prisma.user({ username: req.body.email })
    
    if(!user) return res.status(500).send({msg: "Error: Usuario no existente"})
  }

  if(user && !user.state) return res.status(500).send({msg: "Error: Usuario no activo"})

  const valid = await bcrypt.compare(req.body.password, user.password)

  if(!valid) return res.status(500).send({msg: "Contraseña incorrecta"})

  const auth = await prisma.createAuthUser({
    state: true,
    user: {
      connect: { id: user.id }
    }
  })

  if( user && valid && auth ) return res.status(200).send({hash: await jwt(user), role: user.role, sesion: auth.id})

}

export default login
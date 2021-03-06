import { prisma } from '../../../generated/prisma-client'
import { validationResult } from 'express-validator'
import getUser from '../../services/getUser.services'

const assignPersonDep = async (req, res) => {

  const user = getUser(req.headers.authorization)

  if (!user) return res.status(500).send({ msg: "Usuario no autenticado" })

  if (user.role != "ADMIN") return res.status(500).send({ msg: "Usuario no autorizado" })

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(500).jsonp(errors.array());
  }

  const dep = await prisma.user({id: user.id}).build().deps({where: { num: req.body.dep }})
  
  if( dep.length == 0 ) return res.status(500).send({msg: "Error: El departamento no existe"})

  const assign = await prisma.createPersonDep({
    state: true,
    person: {
      connect: { rut: req.body.person }
    },
    dep: {
      connect: { id: dep[0].id }
    }
  })

  if (assign) return res.status(200).send({ msg: "Asignacion de residente correcta" })
  else return res.status(500).send({ msg: "Error en la asignacion del residente" })
}

export default assignPersonDep
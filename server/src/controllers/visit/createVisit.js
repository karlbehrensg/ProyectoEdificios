import { prisma } from '../../../generated/prisma-client'
import getUser from '../../services/getUser.services'
import { validationResult } from 'express-validator'

const createVisit = async (req, res) => {

  const user = getUser(req.headers.authorization)

  if(!user) res.status(500).send({msg: "Usuario no autenticado"})

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(500).jsonp(errors.array());
  }

  const idbuild = await prisma.user({id: user.id}).build().deps({where: { num: req.body.depto }})
  
  if( idbuild.length == 0 ) res.status(500).send({msg: "Departamento no encontrado"})

  const visit = await prisma.createVisit({
    person: {
      connect: { rut: req.body.person}
    },
    depto: {
      connect: { id: idbuild[0].id}
    }
  })

  if (visit) res.status(200).send({msg: "Visita Creado"})
  else res.status(500).send({msg: "Error al crear la Visita"})

}

export default createVisit
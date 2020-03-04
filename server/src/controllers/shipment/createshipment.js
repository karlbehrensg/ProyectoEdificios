import { prisma } from '../../../generated/prisma-client'
import getUser from '../../services/getUser.services'
import { validationResult } from 'express-validator'

const createshipment = async (req, res) => {

  const user = getUser(req.headers.authorization)

  if(!user) res.status(500).send({msg: "Usuario no autenticado"})

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(500).jsonp(errors.array())
  }

  const validePerson = await prisma.personShipmnet({ rut: req.body.rut })

  if(!validePerson) {

    const idbuild = await prisma.user({id: user.id}).build().deps({where: { num: req.body.dep }})
  
    if( idbuild.length == 0 ) res.status(500).send({msg: "Departamento no encontrado"})

    const personShipment = await prisma.createPersonShipmnet({
      rut: req.body.rut,
      name: req.body.name
    })

    if(!personShipment) res.status(500).send({msg: "Error al crear la persona"})

    const shipment = await prisma.createShipment({
      description: req.body.description,
      person: {
        connect: { id: personShipment.id }
      },
      dep: {
        connect: { id: idbuild[0].id}
      }
    })

    if (shipment) res.status(200).send({msg: "Encomienda Creado"})
    else res.status(500).send({msg: "Error al crear la Visita"})

  } else {

    const idbuild = await prisma.user({id: user.id}).build().deps({where: { num: req.body.dep }})
  
    if( idbuild.length == 0 ) res.status(500).send({msg: "Departamento no encontrado"})

    const shipment = await prisma.createShipment({
      description: req.body.description,
      person: {
        connect: { id: validePerson.id }
      },
      dep: {
        connect: { id: idbuild[0].id}
      }
    })

    if (shipment) res.status(200).send({msg: "Encomienda Creado"})
    else res.status(500).send({msg: "Error al crear la Visita"})

  }
}

export default createshipment
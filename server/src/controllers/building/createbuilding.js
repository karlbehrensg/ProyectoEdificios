import { prisma } from '../../../generated/prisma-client'
import getUser from '../../services/getUser.services'
import { validationResult } from 'express-validator'

const createBuilding = async (req, res) => {

  const user = getUser(req.headers.authorization)

  if (!user) return res.status(500).send({ msg: "Usuario no autenticado" })

  if (user.role != "SUPERADMIN") return res.status(500).send({ msg: "Usuario no autorizado" })

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(500).jsonp(errors.array())
  }

  const building = await prisma.building({ title: req.body.title })

  if (!building) {

    const createbuild = await prisma.createBuilding({
      title: req.body.title,
    })

    if (createbuild) return res.status(200).send({msg: "Edificio Creado"})
    else return res.status(500).send({msg: "Error al crear el Edificio"})

  } else { return res.status(500).send({msg: "Edificio ya existente"}) }

}

export default createBuilding
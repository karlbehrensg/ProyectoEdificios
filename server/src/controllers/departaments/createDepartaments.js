import { prisma } from '../../../generated/prisma-client'
import getUser from '../../services/getUser.services'
import { validationResult } from 'express-validator'

const createDepartaments = async (req, res) => {

  const user = getUser(req.headers.authorization)

  if (!user) res.status(500).send({ msg: "Usuario no autenticado" })

  if (user.role != "SUPERADMIN") res.status(500).send({ msg: "Usuario no autorizado" })

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(500).jsonp(errors.array())
  }

  const departaments = await prisma.departaments({ where: { num: req.body.num, building: { id: req.body.build } } })

  if (departaments.length == 0) {

    const createDepartament = await prisma.createDepartament({
      num: req.body.num,
      building: {
        connect: { id: req.body.build }
      }
    })

    if (createDepartament) res.status(200).send({msg: "Departamento Creado"})
    else res.status(500).send({msg: "Error al crear el Departamento"})

  } else { res.status(500).send({msg: "Departamento ya existente"}) }

}

export default createDepartaments
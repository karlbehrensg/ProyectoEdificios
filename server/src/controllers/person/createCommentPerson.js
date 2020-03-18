import { prisma } from '../../../generated/prisma-client'
import { validationResult } from 'express-validator'
import getUser from '../../services/getUser.services'

const createComment = async (req, res) => {

  const user = getUser(req.headers.authorization)

  if (!user) res.status(500).send({ msg: "Usuario no autenticado" })

  if (user.role != "BUILD") res.status(500).send({ msg: "Usuario no autorizado" })

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(500).jsonp(errors.array());
  }

  const comment = await prisma.updatePersonVisit({
    data: {
      comment: req.body.comment
    },
    where: {
      id: req.body.person
    }
  })

  if (comment) res.status(200).send({ msg: "Observacion creada" })
  else res.status(500).send({ msg: "Error al crear la observacion" })
}

export default createComment
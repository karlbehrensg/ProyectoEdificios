import { prisma } from '../../../generated/prisma-client'
import { validationResult } from 'express-validator'
import getUser from '../../services/getUser.services'

const createPersonVisitComment = async (req, res) => {

  const user = getUser(req.headers.authorization)

  if (!user) return res.status(500).send({ msg: "Usuario no autenticado" })

  if (user.role == "ADMIN" || user.role == "BUILD") {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(500).jsonp(errors.array());
    }

    const comment = await prisma.createCommentVisit({
      desc: req.body.desc,
      person: {
        connect: { id: req.body.person }
      }
    })

    if (comment) return res.status(200).send({ msg: "Observacion creada" })
    else return res.status(500).send({ msg: "Error al crear la observacion" })

  } else {

    return res.status(500).send({ msg: "Usuario no autorizado" })
  }
}

export default createPersonVisitComment
import { prisma } from '../../../generated/prisma-client'
import { validationResult } from 'express-validator'
import getUser from '../../services/getUser.services'

const inactiveCommentPerson = async (req, res) => {

  const user = getUser(req.headers.authorization)

  if (!user) res.status(500).send({ msg: "Usuario no autenticado" })

  if (user.role != "ADMIN" || user.role != "BUILD") {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(500).jsonp(errors.array());
    }

    const comment = await prisma.updateCommentVisit({
      data: {
        state: false
      },
      where: {
        id: req.body.comment
      }
    })

    if (comment) res.status(200).send({ msg: "Observacion Actualizada" })
    else res.status(500).send({ msg: "Error al actualizar la observacion" })

  } else {

    res.status(500).send({ msg: "Usuario no autorizado" })
  }
}

export default inactiveCommentPerson
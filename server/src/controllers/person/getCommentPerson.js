import { prisma } from '../../../generated/prisma-client'
import { validationResult } from 'express-validator'
import getUser from '../../services/getUser.services'

const fragment = `
  fragment PersonVisitWithComment on PersonVisit {
    id
    rut
    name
    comment {
      id
      desc
      state
    }
    lastName
  }
`

const getCommentPerson = async (req, res) => {

  const user = getUser(req.headers.authorization)

  if (!user) return res.status(500).send({ msg: "Usuario no autenticado" })

  if (user.role != "ADMIN" || user.role != "BUILD") {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(500).jsonp(errors.array());
    }

    const comment = await prisma.personVisit({ id: req.body.person }).$fragment(fragment)

    if (comment) return res.status(200).send({ comment })
    else return res.status(500).send({ msg: "Error al obtener las observaciones" })

  } else {

    return res.status(500).send({ msg: "Usuario no autorizado" })
  }
}

export default getCommentPerson
import { prisma } from '../../../generated/prisma-client'
import { validationResult } from 'express-validator'
import getUser from '../../services/getUser.services'

const desactivePersonDep = async (req, res) => {

  const user = getUser(req.headers.authorization)

  if (!user) return res.status(500).send({ msg: "Usuario no autenticado" })

  if (user.role != "ADMIN") return res.status(500).send({ msg: "Usuario no autorizado" })

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(500).jsonp(errors.array());
  }

  const desactive = await prisma.updatePersonDep({
    data: {
      state: false
    },
    where: {
      id: req.body.person
    }
  })

  if (desactive) return res.status(200).send({ msg: "Departarmento de residente desactivada" })
  else return res.status(500).send({ msg: "Error en la asignacion del residente" })
}

export default desactivePersonDep
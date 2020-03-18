import { prisma } from '../../../generated/prisma-client'
import getUser from '../../services/getUser.services'

const fragment = `
  fragment Buils on Build {
    id
    title
  }
`

const getBuildings = async (req, res) => {

  const user = getUser(req.headers.authorization)

  if (!user) res.status(500).send({ msg: "Usuario no autenticado" })

  if (user.role != "SUPERADMIN") res.status(500).send({ msg: "Usuario no autorizado" })

  const buildings = await prisma.buildings().$fragment(fragment)

  if (buildings) res.status(200).send({buildings})
  else res.status(500).send({msg: "Error al obtener el Edificio"})

}

export default getBuildings
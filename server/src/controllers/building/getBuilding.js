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

  if (!user) return res.status(500).send({ msg: "Usuario no autenticado" })

  if (user.role == "ADMIN" || user.role == "SUPERADMIN") {  

    const buildings = await prisma.buildings().$fragment(fragment)

    if (buildings) return res.status(200).send({buildings})
    else return res.status(500).send({msg: "Error al obtener el Edificio"})

  } else {

    return res.status(500).send({ msg: "Usuario no autorizado" })
  }
}

export default getBuildings
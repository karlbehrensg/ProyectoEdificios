import { prisma } from '../../../generated/prisma-client'
import getUser from '../../services/getUser.services'

const fragment = `
  fragment UserWithBuild on User {
    id
    email
    username
    role
    build {
      title
    }
    auth {
      login
      logout
      state
    }
  }
`

const getUsers = async (req, res) => {

  const user = getUser(req.headers.authorization)

  if (!user) return res.status(500).send({ msg: "Usuario no autenticado" })

  if (user.role != "SUPERADMIN") return res.status(500).send({ msg: "Usuario no autorizado" })

  const users = await prisma.users().$fragment(fragment)

  if (users) return res.status(200).send({ users })
  else return res.status(500).send({ msg: "Error al obtener los usuarios" })
}

export default getUsers
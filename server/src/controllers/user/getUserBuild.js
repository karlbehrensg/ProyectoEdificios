import { prisma } from '../../../generated/prisma-client'
import getUser from '../../services/getUser.services'

const fragment = `
  fragment UserWithBuild on User {
    id
    email
    username
    role
    state
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

const getUsersBuild = async (req, res) => {

  const user = getUser(req.headers.authorization)

  if (!user) res.status(500).send({ msg: "Usuario no autenticado" })

  if (user.role != "ADMIN") res.status(500).send({ msg: "Usuario no autorizado" })

  const build = await prisma.user({ id: user.id }).build()

  const users = await prisma.users({ where: { build: { id: build.id }, role: "BUILD" } }).$fragment(fragment)

  if (users) res.status(200).send({ users })
  else res.status(500).send({ msg: "Error al obtener los usuarios" })
}

export default getUsersBuild
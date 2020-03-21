import { prisma } from '../../../generated/prisma-client'
import getUser from '../../services/getUser.services'

const fragment = `
  fragment PersonsWithBuild on PersonDep {
    id
    state
    dep {
      num
    }
    person {
      rut
      name
      email
      phone
      lastName
    }
  }
`

const getPersponsBuild = async (req, res) => {

  const user = getUser(req.headers.authorization)

  if(!user) return res.status(500).send({msg: "Usuario no autenticado"})

  const idbuild = await prisma.user({id: user.id}).build()

  if(!idbuild) return res.status(500).send({msg: "Edificio no encontrado"})
  
  const persons = await prisma.personDeps({where: { state: true, dep: { building: { id: idbuild.id } } }}).$fragment(fragment)

  if (persons) return res.status(200).send({persons})
  else return res.status(500).send({msg: "Error al obtener la Persona"})
}

export default getPersponsBuild
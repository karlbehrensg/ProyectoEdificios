import { prisma } from '../../../generated/prisma-client'
import getUser from '../../services/getUser.services'

const fragment = `
  fragment Visitas on Visit {
    id
    date
    person {
      id
      rut
      name
    }
    depto {
      num
    }
  }
`

const getVisitBuild = async (req, res) => {

  const user = getUser(req.headers.authorization)

  if(!user) return res.status(500).send({msg: "Usuario no autenticado"})

  const idbuild = await prisma.user({id: user.id}).build()

  if(!idbuild) return res.status(500).send({msg: "Edificio no encontrado"})
  
  const visits = await prisma.visits({ where: { depto : { building: { id : idbuild.id} }}, orderBy: 'date_DESC'}).$fragment(fragment)

  if (visits) return res.status(200).send({visits})
  else return res.status(500).send({msg: "Error al crear la Visita"})

}

export default getVisitBuild
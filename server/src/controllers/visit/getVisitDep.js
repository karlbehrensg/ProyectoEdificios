import { prisma } from '../../../generated/prisma-client'
import getUser from '../../services/getUser.services'

const getVisitDep = async (req, res) => {

  const user = getUser(req.headers.authorization)

  if(!user) res.status(500).send({msg: "Usuario no autenticado"})
  
  const visits = await prisma.visits({ where: { depto : { id: req.body.id }}})

  if (visits) res.status(200).send({visits})
  else res.status(500).send({msg: "Error al ver las visitas"})
}

export default getVisitDep
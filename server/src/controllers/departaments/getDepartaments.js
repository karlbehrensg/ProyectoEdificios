import { prisma } from '../../../generated/prisma-client'
import getUser from '../../services/getUser.services'

const getDepartaments = async (req, res) => {
  
  const user = getUser(req.headers.authorization)

  if(!user) return res.status(500).send({response: "Usuario no valido"})

  const idbuild = await prisma.user({id: user.id}).build()

  if(!idbuild) return res.status(500).send({response: "Edificio no encontrado"})
  
  const departaments = await prisma.departaments({ where: { building: { id : idbuild.id }}})

  if (departaments) return res.status(200).send({departaments})
  else return res.status(500).send({response: "Error al obtener los Departamentos"})
}

export default getDepartaments
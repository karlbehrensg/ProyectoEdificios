import { prisma } from '../../../generated/prisma-client'
import getUser from '../../services/getUser.services'

const fragment = `
  fragment Encomiendas on Shipment {
    id
    date
    description
    person {
      rut
      name
    }
    dep {
      num
    }
  }
`

const getShipmentsBuild = async (req, res) => {

  const user = getUser(req.headers.authorization)

  if(!user) return res.status(500).send({msg: "Usuario no autenticado"})

  const idbuild = await prisma.user({id: user.id}).build()

  if(!idbuild) return res.status(500).send({msg: "Edificio no encontrado"})
  
  const shipments = await prisma.shipments({ where: { dep : { building: { id : idbuild.id} }}, orderBy: 'date_DESC'}).$fragment(fragment)

  if (shipments) return res.status(200).send({shipments})
  else return res.status(500).send({msg: "Error al crear la Visita"})

}

export default getShipmentsBuild
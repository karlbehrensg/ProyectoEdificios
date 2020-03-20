import { prisma } from '../../../generated/prisma-client'
import { validationResult } from 'express-validator'
import getUser from '../../services/getUser.services';

const createPersonDep = async (req, res) => {

  const user = getUser(req.headers.authorization)

  if(!user) res.status(500).send({msg: "Usuario no autenticado"})

  if (user.role != "ADMIN") res.status(500).send({ msg: "Usuario no autorizado" })

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(500).jsonp(errors.array());
  }

  const validePerson = await prisma.person({rut: req.body.rut})

  if(validePerson) res.status(500).send({msg: "Error: El residente ya existe"})

  const dep = await prisma.user({id: user.id}).build().deps({where: { num: req.body.dep }})
  
  if( dep.length == 0 ) res.status(500).send({msg: "Error: El departamento no existe"})
  
  const person = await prisma.createPerson({
    rut: req.body.rut,
    email: req.body.email,
    name: req.body.name,
    phone: "9" + req.body.phone,
    lastName: req.body.lastName,
    dep: {
      create: [
        { 
          state: true,
          dep: {
            connect: { id: dep[0].id }
          }
        }
      ]
    }
  })

  if (person) res.status(200).send({msg: "Persona Creado"})
  else res.status(500).send({msg: "Error al crear la Persona"})
}

export default createPersonDep
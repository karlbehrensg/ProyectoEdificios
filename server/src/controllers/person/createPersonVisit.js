import { prisma } from '../../../generated/prisma-client'
import { validationResult } from 'express-validator'
import getUser from '../../services/getUser.services';

const createPersonVisit = async (req, res) => {

  const user = getUser(req.headers.authorization)

  if(!user) return res.status(500).send({msg: "Usuario no autenticado"})

  if (user.role == "BUILD" || user.role == "ADMIN") { 

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(500).jsonp(errors.array());
    }

    const validePerson = await prisma.personVisit({rut: req.body.rut})
    
    if( validePerson ) {

      if( req.body.obs == true ) {
        
        const comments = await prisma.commentVisits({where: { person: { id: validePerson.id }, state: true }})

        if( comments != null ) return res.status(500).send({alert: "Persona con advertencia", person: validePerson.id})
      }

      const idbuild = await prisma.user({id: user.id}).build().deps({where: { num: req.body.dep }})
    
      if( idbuild.length == 0 ) return res.status(500).send({msg: "Departamento no encontrado"})

      const visit = await prisma.createVisit({
        person: {
          connect: { id: validePerson.id }
        },
        patent: req.body.patent,
        depto: {
          connect: { id: idbuild[0].id }
        },
        user: {
          connect: { id: user.id }
        }
      })

      if (visit) return res.status(200).send({msg: "Visita Creado"})
      else return res.status(500).send({msg: "Error al crear la Visita"})

    } else {

      const person = await prisma.createPersonVisit({
        rut: req.body.rut,
        name: req.body.name,
        lastName: req.body.lastName,
      })

      const idbuild = await prisma.user({id: user.id}).build().deps({where: { num: req.body.dep }})
    
      if( idbuild.length == 0 ) return res.status(500).send({msg: "Departamento no encontrado"})

      const visit = await prisma.createVisit({
        person: {
          connect: { id: person.id }
        },
        patent: req.body.patent,
        depto: {
          connect: { id: idbuild[0].id }
        },
        user: {
          connect: { id: user.id }
        }
      })

      if (visit) return res.status(200).send({msg: "Visita Creado"})
      else return res.status(500).send({msg: "Error al crear la Visita"})
    }
  } else return res.status(500).send({ msg: "Usuario no autorizado" })
}

export default createPersonVisit
import { prisma } from '../../../generated/prisma-client'
import getUser from '../../services/getUser.services'
import { validationResult } from 'express-validator'

const createDepartaments = async (req, res) => {

  const user = getUser(req.headers.authorization)

  if (!user) return res.status(500).send({ msg: "Usuario no autenticado" })

  if (user.role != "SUPERADMIN") return res.status(500).send({ msg: "Usuario no autorizado" })

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(500).jsonp(errors.array())
  }

  const numDepArray = String(req.body.num).split(",")
  var okStatus = ""
  var errorStatus = ""

  for (let index = 0; index < numDepArray.length; index++) {

    const departaments = await prisma.departaments({ where: { num: numDepArray[index], building: { id: req.body.build } } })

    if (departaments.length == 0) {

      const createDepartament = await prisma.createDepartament({
        num: numDepArray[index],
        building: {
          connect: { id: req.body.build }
        }
      })

      if(createDepartament) okStatus += "Nº " + numDepArray[index] + " "

    } else {
      
      errorStatus += "Nº " + numDepArray[index] + " "
    }
  }

  if(okStatus != "" && errorStatus == "" ) { return res.status(200).send({msg: "Los departamentos " + "[" + okStatus + "]" + " han sido creados"}) }
  if(okStatus != "" && errorStatus != "" ) { return res.status(500).send({msg: "Departamentos " + "[" + errorStatus + "]" + " ya existen. Departamentos " + "[" + okStatus + "]" + " han sido creados"}) }
  if(errorStatus != "" && okStatus == "" ) { return res.status(500).send({msg: "Departamentos " + "[" + errorStatus + "]" + " ya existen"}) }
}

export default createDepartaments
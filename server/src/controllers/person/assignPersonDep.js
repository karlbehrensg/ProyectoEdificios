import { prisma } from '../../../generated/prisma-client'
import { validationResult } from 'express-validator'
import getUser from '../../services/getUser.services'

const assignPersonDep = async (req, res) => {

	const user = getUser(req.headers.authorization)

	if (!user) res.status(500).send({ msg: "Usuario no autenticado" })

	if (user.role != "ADMIN") res.status(500).send({ msg: "Usuario no autorizado" })

	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return res.status(500).jsonp(errors.array());
    }
    
	const inactive = await prisma.createPersonDep({
        state: true,
        person: {
            connect: { id: req.body.person }
        },
        dep: {
            connect: { id: req.body.dep }
        }
	})

	if (inactive) res.status(200).send({msg: "Asignacion de residente correcta"})
	else res.status(500).send({msg: "Error en la asignacion del residente"})
}

export default assignPersonDep
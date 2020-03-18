import { prisma } from '../../../generated/prisma-client'
import { validationResult } from 'express-validator'
import getUser from '../../services/getUser.services'

const inactiveDep = async (req, res) => {

	const user = getUser(req.headers.authorization)

	if (!user) res.status(500).send({ msg: "Usuario no autenticado" })

	if (user.role != "ADMIN") res.status(500).send({ msg: "Usuario no autorizado" })

	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return res.status(500).jsonp(errors.array());
    }
    
	const inactive = await prisma.updatePersonDep({
		data: { state: false },
		where: {
			id: req.body.id
		}
	})

	if (inactive) res.status(200).send({msg: "Departamento de persona inactivada"})
	else res.status(500).send({msg: "Error en la inactivacion del residente"})
}

export default inactiveDep
import { prisma } from '../../../generated/prisma-client'
import { validationResult } from 'express-validator'
import getUser from '../../services/getUser.services'

const inactiveUser = async (req, res) => {

	const user = getUser(req.headers.authorization)

	if (!user) res.status(500).send({ msg: "Usuario no autenticado" })

	if (user.role != "ADMIN") res.status(500).send({ msg: "Usuario no autorizado" })

	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return res.status(500).jsonp(errors.array());
	}

	const inactive = await prisma.updateUser({
		data: { state: req.body.state },
		where: {
			id: req.body.user
		}
	})

	if (inactive) res.status(200).send({msg: "Usuario Actualizado"})
	else res.status(500).send({msg: "Error al actualizar el Usuario"})
}

export default inactiveUser
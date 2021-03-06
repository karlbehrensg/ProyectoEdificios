import { prisma } from '../../../generated/prisma-client'
import getUser from '../../services/getUser.services'

const logout = async (req, res) => {

	const user = getUser(req.headers.authorization)

	if (!user) return res.status(500).send({ msg: "Usuario no autenticado" })

	const logout = await prisma.updateAuthUser({
		data: { state: false },
		where: {
			id: req.body.user
		}
	})

	if (logout) return res.status(200).send({msg: "Sesion cerrada con exito"})
	else return res.status(500).send({msg: "Error al cerrar sesion"})
}

export default logout
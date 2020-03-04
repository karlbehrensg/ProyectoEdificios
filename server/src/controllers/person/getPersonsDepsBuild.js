import { prisma } from '../../../generated/prisma-client'

const fragment = `
  fragment UserWithDepartaments on User {
    id
    name
    num
    owner {
      rut
      name
      email
      lastName
    }
  }
`

const getPersonsDepsBuild = async (req, res) => {
  
  const departaments = await prisma.departaments({ where: { building : { id: req.body.id }}}).$fragment(fragment)

  if (departaments) res.status(200).send({departaments})
  else res.status(500).send({msg: "Error al crear la Persona"})
}

export default getPersonsDepsBuild
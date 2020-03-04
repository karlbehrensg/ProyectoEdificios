import jwt from 'jsonwebtoken'
var secret = 'btspemfa'

export default async function createToken(user) {
  var payload = {
    id: user.id,
    email: user.email,
    role: user.role
  }

  return jwt.sign(payload, secret);
}

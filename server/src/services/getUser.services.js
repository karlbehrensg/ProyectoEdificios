import jwt from 'jsonwebtoken';
var secret = 'btspemfa'

const getUser = token => {
  
  if (!token) return false

  const user = jwt.decode(token, secret);
  
  if(user) return user
  else return false
}

export default getUser

const { prisma } = require('../../generated/prisma-client')
const bcrypt = require('bcryptjs')

async function main() {
  
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash("12345678", salt, async (err, hash) => {
      const user = await prisma.createUser({ 
        email: "admin@admin.com",
        username: "admin",
        password: hash,
      })
    });
  });

}

main().catch(e => console.error(e))
## Getting Started

### Prerequisites

Install Docker --> [Docker](https://www.docker.com/)

Install Docker Compose --> [Docker Compose](https://docs.docker.com/compose/install/)

### Installing

cd in the project directory.

```
docker-compose build   // start containers

docker-compose up      // run containers

docker exec -it <container id> /bin/bash  //into container

prisma deploy          // run migrations

prisma generate        // generate lib prisma

node ./prisma/seeds/admin.js  //create user admin (user: admin, password: 12345678)

prisma token           // token prisma
```

### Open
Open in [http://localhost:4200](http://localhost:4200) and database [http://localhost:4466/_admin](http://localhost:4466/_admin)

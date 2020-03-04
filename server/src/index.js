import express from 'express'
import bodyParser from'body-parser'
import cors from 'cors'
import user_route from './routes/user.route'
import person_route from './routes/person.route'
import visit_route from './routes/visit.route'
import departaments_route from './routes/departaments.route'
import shipment_route from './routes/shipment.route'

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors())

// <-- routes -->
app.use('/api', user_route)
app.use('/api', person_route)
app.use('/api', visit_route)
app.use('/api', departaments_route)
app.use('/api', shipment_route)

app.listen(4000, function() {
  console.log("el servidor esta escuchando en el puerto " + 4000);
});



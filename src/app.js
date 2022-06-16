const process = require('process');
require('dotenv').config();
const PORT = process.env.PORT || 3030;

let express = require("express");
let app = express();
let path = require("path");

//Enrutadores
const usersRouter = require('./routes/usersRouter')

//Middlewares
app.use(express.static(path.join(__dirname, "../public")))
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//middlewares de rutas
app.use('/auth',usersRouter)

app.listen(PORT, ()=>{
    console.log(`Servidor abierto en puerto ${PORT}`)
})

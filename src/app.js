const process = require('process');
require('dotenv').config();
const PORT = process.env.PORT || 3030;

let express = require("express");
let app = express();
let path = require("path");

//Enrutadores
const usersRouter = require('./routes/usersRouter');
const protagonistRouter = require('./routes/api/protagonistRouter');
const { application } = require('express');

//Middlewares
app.use(express.static(path.join(__dirname, "../public")))
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//middlewares de rutas
app.use('/auth',usersRouter)
app.use('/characters',protagonistRouter)

app.listen(PORT, ()=>{
    console.log(`Servidor abierto en puerto ${PORT}`)
})

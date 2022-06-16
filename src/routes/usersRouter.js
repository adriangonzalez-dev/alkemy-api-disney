const express = require("express")
const router= express.Router();

const {register, login, logout}= require('../controllers/usersControllers')
//validaciones
const registerValidator = require('../validations/registerValidator')
//middlewares

//routers
router.post("/register", registerValidator ,register);
router.post("/login", login);
router.get("/logout", logout);

module.exports= router;

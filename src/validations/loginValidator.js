const {check, body}=require("express-validator");
const db = require("../database/models")
const bcrypt = require("bcryptjs")

let loginValidator = [
    check('email')
                .notEmpty()
                .isEmail().withMessage('Debe ingresar un email').bail(),

    body('email').custom((value,{req})=>{

        return db.User.findOne({
            where:{
                email:req.body.email
            }
        })
        .then(user=>{
            if(!bcrypt.compareSync(req.body.pass,user.pass)){
                return Promise.reject("Usuario o contraseña Incorrecta")
            }
    
            return true;
        })

    }).withMessage("Email o contraseña Incorrecta").bail(),

    body('pass').notEmpty().withMessage('Ingrese su contraseña').bail()
]

module.exports= loginValidator;
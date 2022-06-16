const {check, body} = require('express-validator');

const db = require("../database/models");

const registerValidator = [
    check('username')
                .notEmpty().withMessage('El nombre de usuario es requerido').bail(),

    check('email')
                .notEmpty().withMessage('El email es requerido').bail()
                .isEmail().withMessage('Ingrese un mail válido').bail(),

    body('email').custom((value)=>{

       return db.User.findOne({
            where:{
                email: value
            }
        })
            .then(user=>{
                if(user){
                    return Promise.reject("El email ya se encuentra registrado")
                }
            })
     }),

    check('pass')
                .notEmpty().withMessage('La contraseña es requerida').bail()
                .isLength({min: 8, max: 12}).withMessage('La contraseña debe tener como mínimo 8 carácteres').bail(),

]

module.exports = registerValidator;
const {check} = require('express-validator');

const characterValidator = [
    check('name')
                .notEmpty().withMessage('El nombre del personaje es requerido').bail(),

    check('history')
                .notEmpty().withMessage('Ingrese la historia del personaje').bail()
                .isLength({min: 10, max: 500}).withMessage('No debe superar los 500 carácteres').bail(),

]

module.exports = characterValidator;
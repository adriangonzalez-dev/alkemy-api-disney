const {body, check} = require('express-validator');
const { movieExistsValidation,categoryExistValidation } = require('../helpers/dbValidations');

/* title, image, release_date, rating, category_id */
const moviesValidator = [
    check('title','El titulo es requerido').notEmpty(),
    body('title','El titulo ya existe').custom(value=>movieExistsValidation(value)),
    check('release_date', 'Debe ser una fecha válida').isDate(),
    check('rating', 'El rating debe estar entre 0 y 10').notEmpty().isInt({min:0,max:10}),
    body('category_id', 'La categoria no existe en la base de datos').custom(value=>categoryExistValidation(+value))
]

module.exports = moviesValidator
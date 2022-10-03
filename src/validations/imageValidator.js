const {body} = require('express-validator');

const imageValidator = [
    body("image").custom((value, {req}) => {
        if(req.file&& (req.file.mimetype === "image/png" || req.file.mimetype === "image/jpeg")){
            return true
        } else {
            return Promise.reject("Imagen requerida")
        }
        
    })
]

module.exports = imageValidator;


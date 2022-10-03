const express = require('express');
const router = express.Router();

//controllers
const {list,detail,create,update,destroy,search} = require('../../controllers/api/protagonistController');

//middlewares
const {accessWithToken, imageCheck} = require('../../middlewares/middlewares');
const uploadImageChar = require('../../middlewares/uploadImageChar');

//validations
const characterValidator = require('../../validations/characterValidator');
const imageValidator = require('../../validations/imageValidator')

router
    .get('/',search)
    .get('/', accessWithToken,list)
    .get('/:id', accessWithToken,detail)
    .post('/create',accessWithToken, uploadImageChar.single('image'),imageValidator,characterValidator,create)
    .put('/update/:id',accessWithToken,uploadImageChar.single('image'),characterValidator,update)
    .delete('/delete/:id',accessWithToken,destroy)
    

       
module.exports = router
const express = require('express');
const router = express.Router();

//controllers
const {list,detail,create,update,destroy,search} = require('../../controllers/api/protagonistController');
const { catchErrors } = require('../../helpers/catchErrors');

//middlewares
const {accessWithToken, imageCheck} = require('../../middlewares/middlewares');
const uploadImageChar = require('../../middlewares/uploadImageChar');
const charExists = require('../../middlewares/charExists');

//validations
const characterValidator = require('../../validations/characterValidator');
const imageValidator = require('../../validations/imageValidator');

router
.get('/', accessWithToken,list)
.get('/search',accessWithToken,search)
.get('/:id', accessWithToken,detail)
.post('/create',accessWithToken, uploadImageChar.single('image'),imageValidator,characterValidator,catchErrors,create)
.put('/update/:id',accessWithToken,charExists,uploadImageChar.single('image'),characterValidator,catchErrors,update)
.delete('/delete/:id',accessWithToken,charExists,destroy)

module.exports = router
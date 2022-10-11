const router = require('express').Router()
const {allMovies, oneMovie, createMovie, updateMovie,deleteMovie,searchMovie} = require('../../controllers/api/moviesController')
const { catchErrors } = require('../../helpers/catchErrors')
const { accessWithToken } = require('../../middlewares/middlewares')
const movieExists = require('../../middlewares/movieExists')
const participationImage = require('../../middlewares/uploadImagePart')
const moviesValidator = require('../../validations/moviesValidator')


router
.get('/', accessWithToken,allMovies)
.get('/:id',accessWithToken,movieExists,oneMovie)
.post('/',accessWithToken,participationImage.single('image'),moviesValidator,catchErrors,createMovie)
.put('/:id',accessWithToken,movieExists,participationImage.single('image'),moviesValidator,catchErrors,updateMovie)
.delete('/:id',accessWithToken,movieExists,catchErrors,deleteMovie)
.get('/search',accessWithToken,searchMovie)

module.exports = router
const router = require('express').Router()
const {allMovies, oneMovie, createMovie, updateMovie,deleteMovie,searchMovie} = require('../../controllers/api/moviesController')
const { catchErrors } = require('../../helpers/catchErrors')
const { accessWithToken } = require('../../middlewares/middlewares')
const movieExists = require('../../middlewares/movieExists')




router
.get('/', accessWithToken,allMovies)
.get('/:id',accessWithToken,movieExists,oneMovie)
.post('/',accessWithToken,catchErrors,createMovie)
.put('/:id',accessWithToken,movieExists,catchErrors,updateMovie)
.delete('/:id',accessWithToken,movieExists,catchErrors,deleteMovie)
.get('/search',accessWithToken,searchMovie)

module.exports = router
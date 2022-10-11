const { deleteFiles } = require('../../helpers/deleteImage')
const { notFoundError } = require('../../helpers/notFoundError')
const {getMovies,getOneMovie,create,update,destroyMovie,search} = require('../../services/moviesServices')

module.exports = {
    allMovies: async (req, res) => {
        const movies = await getMovies()
        if(!movies){
            return notFoundError(404, 'Movies', res)
        }
        return res.status(200).json({
            movies
        })
    },
    oneMovie: async (req,res) => {
        const {id} = req.params
        const movie = await getOneMovie(+id)
        if(!movie){
            return notFoundError(404, 'Movie', res)
        }
        return res.status(200).json({
            movie
        })
    },
    createMovie: async (req,res) => {
        const data = {
            ...req.body,
            image: req.file.filename
        }
        const movie = await create(data);
        
        if(!movie){
            return res.status(400).json({
                message: "can't create movie"
            })
        }

        return res.status(201).json({
            movie,
            created: 'ok'
        })

    },
    updateMovie: async (req,res) => {
        const data = {
            ...req.body,
            image: req.file ? req.file.filename : null
        }

        const {id} = req.params

        const movie = await update(data, +id);

        if(!movie){
            return res.status(400).json({
                message: "can't update movie"
            })
        }

        return res.status(201).json({
            movie,
            updated: 'ok'
        })
    },
    deleteMovie: async (req,res) => {
        const {id} = req.params;
        const {image} = req.movie;
        try {
            deleteFiles(image, 'participations')
            await destroyMovie(+id)
            return res.status(200).json({
                deleted: 'ok'
            })
        } catch (error) {
            return res.status(500).json({
                message:'internal server error'
            })
        }

    },
    searchMovie: async (req,res) => {
        search()
    } 
}
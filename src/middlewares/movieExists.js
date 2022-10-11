const db = require("../database/models");

const movieExists = async (req, res, next) => {
    const {id} = req.params

    const movie = await db.Participation.findByPk(+id);

    if(!movie){
        return res.status(404).json({
            message: `La pelicula con id ${id} no existe`
        })
    }
    req.movie = movie
    next()
}

module.exports = movieExists
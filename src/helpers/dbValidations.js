const db = require("../database/models");

module.exports = {
    movieExistsValidation:async (value)=>{
        const newMovie = value.toLowerCase().trim()
        const movie = await db.Participation.findOne({where:{title:newMovie}});

        if(movie){
            throw new Error
        }
    },
    categoryExistValidation:async(value)=>{
        const category = await db.Category.findByPk(value);
        if(!category){
            throw new Error
        }


    }
}
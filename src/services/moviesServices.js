const db = require('../database/models');

module.exports = {
    getMovies: async () => {
        const movies = await db.Participation.findAll({
            attributes: ['title', 'image','release_date'],
        })
        return movies;
    },
    getOneMovie: async (id) => {
        const movie = db.Participation.findByPk(id);
        return movie;
    },
    create: async (data) => {
        const {title, image, release_date, rating, category_id} = data;
        image = `/public/img/participations/${image}`
        title = title.toLowerCase().trim()
        const movie = await db.Participation.create({
            title,
            image,
            release_date,
            rating,
            category_id
        })

        return movie;
    },
    update: async (data, id) => {
        const movieExist = req.movie;
        const {title, image, release_date, rating, category_id} = data;
        title = title.toLowerCase().trim()
        const movie = await db.Participation.update({
            title,
            image: image && `/public/img/participations/${image}`,
            release_date,
            rating,
            category_id
        },{
            where:{id}
        })

        return movie;
    },
    destroyMovie: async (id) => {
        await db.Participation.destroy({
            where:{id}
        })
        return;
    },
    search: async () => {
        let movies = []
        if(req.query.title){
            protagonists = await db.Participation.findAll({
                include:[{association: 'genres'}],
                where:{
                    title:{
                        [Op.like]:`%${req.query.title}%`
                    }
                }
            })
        }
        if(req.query.order){
            protagonists = await db.Protagonist.findAll({
                include:[{association: 'participations'}],
                order: [
                    ['title', order]
                ]
            })
        }

        return movies;
    }
}


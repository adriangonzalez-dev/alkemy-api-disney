const { Op } = require('sequelize');
const db = require('../database/models');
const { deleteFiles } = require('../helpers/deleteImage');


module.exports = {
    getAll: async () => {
        const protagonists = await db.Protagonist.findAll({
            attributes: ['name', 'image'],
            include: [{ association: "participations" }]
        })
        return protagonists
    },
    getOne: async (id) => {
        const protagonist = await db.Protagonist.findByPk(id)
        return protagonist
    },
    createChar: async (body, file) => {
        const {name, age, weight, history} = body;
        const {filename} = file;
        const protagonist = await db.Protagonist.create({
            name,
            image: `/public/img/characters/${filename}`,
            age,
            weight,
            history
        })
        return protagonist
    },
    updateChar: async (req,res) => {
        const {filename} = req.file
        const {name, age, weight, history} = req.body
        const {id} = req.params

        const protagonist = req.protagonist

        if(req.file){
            deleteFiles(protagonist.image, 'characters')
        }

        const protagonistdb = await db.Protagonist.update({
            name: name ? name : protagonist.name,
            image: req.file ? `/public/img/characters/${filename}` : protagonist.image,
            age: age ? age : protagonist.age,
            weight: weight ? weight : protagonist.weight,
            history: history ? history : protagonist.history
        },{
            where:{id},
        })
        return protagonistdb;
    },
    deleteChar: async (req,res)=>{
        const protagonist = req.protagonist
        const {id} = req.params

        deleteFiles(protagonist.image,'characters')

        await db.Protagonist.destroy({
            where: {id}
        })

        return;
    },
    search: async (req)=>{
        let protagonists = []
        if(req.query.name){
            protagonists = await db.Protagonist.findAll({
                include:[{association: 'participations'}],
                attributes: ['name', 'image'],
                where:{
                    name:{
                        [Op.like]:`%${req.query.name}%`
                    }
                }
            })
        }
        if(req.query.age){
            protagonists = await db.Protagonist.findAll({
                include:[{association: 'participations'}],
                attributes: ['name', 'image'],
                where:{
                    age:{
                        [Op.like]:`%${req.query.age}%`
                    }
                }
            })
        }
        if(req.query.weight){
            protagonists = await db.Protagonist.findAll({
                include:[{association: 'participations'}],
                attributes: ['name', 'image'],
                where:{
                    weight:{
                        [Op.like]:`%${req.query.weight}%`
                    }
                }
            })
        }

        return protagonists;
    }

}
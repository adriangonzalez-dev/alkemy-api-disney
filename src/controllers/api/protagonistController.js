const db = require('../../database/models');
const {validationResult}=require("express-validator");
const path = require("path");
const {Op} = require('sequelize')

module.exports = {
    list:(req,res)=>{
         
    },
    detail:(req,res)=>{
        db.Protagonist.findOne({
            where:{
                id: req.params.id
            }
        })
        .then(character=>{
            res.status(200).json({
                character
            })
        })
    },
    create: (req,res)=>{

       let errors = validationResult(req);
        if(errors.isEmpty()){
            
            db.Protagonist.create({
                name: req.body.name,
                image: `/public/img/characters/${req.file.filename}`,
                age: req.body.age ? req.body.age : null,
                weight: req.body.weight ? req.body.weight : null,
                history: req.body.history
            })
            
            .then(protagonist=>{
                res.status(200).json({
                    created: "ok",
                    protagonist,

                })
            })
                
        } else {
            let errorsMsg = Object.entries(errors.mapped()).map(result=>result[1].msg);
            res.status(203).json({
                errors: errorsMsg
            })
            
        }
        
    },
    update: (req,res)=>{

        let errors = validationResult(req);
        if(errors.isEmpty()){
            
            db.Protagonist.findByPk(req.params.id)
                .then(protagonist=>{
                    if(req.file){
                        fs.unlinkSync(path.join(__dirname, `../../../public/img/products/${protagonist.image}`))
                    }

                    db.Protagonist.update({
                        name: req.body.name ? req.body.name : protagonist.name,
                        image: req.file ? `/public/img/characters/${req.file.filename}` : protagonist.image,
                        age: req.body.age ? req.body.age : protagonist.age,
                        weight: req.body.weight ? req.body.weight : protagonist.weight,
                        history: req.body.history ? req.body.history : protagonist.history
                    },{
                        where:{
                            id:req.params.id
                        }
                    })
                    
                    .then(()=>{
                        db.Protagonist.findByPk(req.params.id)
                        .then(edited=>{
                            res.status(201).json({
                                updated:"Ok",
                                edited
                            })
                        })
                    })
                })
                
        } else {
            let errorsMsg = Object.entries(errors.mapped()).map(result=>result[1].msg);
            res.status(203).json({
                errors: errorsMsg
            })
            
        }

    },
    destroy:(req,res)=>{

        db.Protagonist.findByPk({
            where:{
                id:req.params.id
            }
        })

        .then(protagonist=>{
            fs.unlinkSync(path.join(__dirname, `../../../public/img/products/${protagonist.image}`))
        })

        db.Protagonist.destroy({
            where: {
                id:req.params.id
            }
        })
    },
    search:(req,res)=>{
        db.Protagonist.findAll({
            include:[{association: 'participations'}],
            where:{
                name:{
                    [Op.like]:req.query.name
                }
            }
        })
        .then(protagonist=>{

            if(protagonist.length > 0){
                res.json({
                    data: {
                        name:protagonist.name,
                        image:protagonist.image
                    }
                })
            } else {
                res.json({
                    data: 'No existen resultados.'
                })
            }
        })
    },
    filter:(req,res)=>{
        console.log(req.query.age, req.query.idMovie)
    }
}
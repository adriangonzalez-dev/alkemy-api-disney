const db = require('../../database/models');
const {validationResult}=require("express-validator");
const path = require("path");
const {Op} = require('sequelize')
const {getAll, getOne, createChar, updateChar, deleteChar, search} = require('../../services/protagonistServices');
const { notFoundError } = require('../../helpers/notFoundError');

module.exports = {
    list: async (req,res)=>{
        const protagonist = await getAll();
        if(!protagonist){
            return notFoundError(404, 'protagonists')
        }

        return res.status(200).json({
            data: protagonist
        })

    },
    detail:async (req,res)=>{
        const {id} = req.params
        const character = await getOne(+id);
        if(!character){
            return notFoundError(404, 'character',res)
        }
        return res.status(200).json({
            character
        })

    },
    create: async (req,res)=>{
        const protagonist = await createChar(req.body, req.file);
        if(!protagonist){
            return res.status(500).json({
                message: 'internal server error'
            })
        }

        return res.status(200).json({
            created: "ok",
            protagonist,
        })
        
    },
    update: async (req,res)=>{

        await updateChar(req,res)

        return res.status(201).json({
        updated: 'ok'
        })

    },
    destroy:async (req,res)=>{

        await deleteChar(req,res)

        return res.status(200).json({
            message: 'delete ok'
        })
    },
    search: async (req,res)=>{
        const protagonists = await search(req)

        if(!protagonists){
            return res.status(404).json({
                message: 'no hay resultados'
            })
        }

        return res.status(200).json({
            protagonists
        })
    },
    filter:(req,res)=>{
        console.log(req.query.age, req.query.idMovie)
    }
}
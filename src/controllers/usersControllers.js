const {validationResult}= require('express-validator');
const db = require('../database/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendMail = require('../helpers/sendMails');
const SECRET = process.env.SECRET;


module.exports={
    register:async (req,res)=>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let {username, email, pass} = req.body;
            let pass2= await bcrypt.hash(pass,10)
            db.User.create({
                username,
                email,
                pass: pass2
            }) 
            .then(user=>{
                sendMail({
                    to: user.email,
                    from:process.env.EMAIL_SENDGRID,
                    subject:'Bienvenido',
                    text: 'Gracias por suscribirte!'
                })
                res.status(200).json({
                    user
                })
            })
            .catch(error=>{
                console.log(error)
            })

            


        } else {
            let errorsMsg = Object.entries(errors.mapped()).map(result=>result[1].msg);
            res.status(206).json({
                errors: errorsMsg
            })
        }
    },
    login: async (req,res)=>{
        let errors = validationResult(req)

        if(errors.isEmpty()){

            await db.User.findOne({
                where:{
                    email:req.body.email
                }
            })
            .then(user=>{

                let dates = {
                    username: user.username,
                    email:user.email,
                    id: user.id
                }

                let token = jwt.sign({
                    id:user.id,
                    email:user.email
                }, SECRET,{
                    expiresIn:"2h"
                })

                let nDates = {
                    ...dates,
                    token
                }
                
                res.status(200).json({
                    nDates
                })
            })
            .catch(err=>{
                console.log(err)
            })

        } else{
            let errorsMsg = Object.entries(errors.mapped()).map(result=>result[1].msg);
            res.status(401).json({
                errors: errorsMsg
            })
        }
    },
    logout:(req,res)=>{
        res.send("logout")
    }
}


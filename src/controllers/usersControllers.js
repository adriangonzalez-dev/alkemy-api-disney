const {validationResult}= require('express-validator');
const db = require('../database/models');
const bcrypt = require('bcryptjs');


module.exports={
    register:(req,res)=>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let {username, email, pass} = req.body;
            let pass2=bcrypt.hashSync(pass,10)
            db.User.create({
                username,
                email,
                pass: pass2
            })
            .then(user=>{
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
    login:(req,res)=>{
        res.send("login")
    },
    logout:(req,res)=>{
        res.send("logout")
    }
}


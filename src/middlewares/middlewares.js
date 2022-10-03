const jwt = require('jsonwebtoken');
const process = require('process');
require('dotenv').config();
const SECRET = process.env.SECRET

module.exports = {
    accessWithToken: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(token==null){
            return res.status(401).send("Token requerido");
        } else {
            jwt.verify(token, SECRET, (err, user)=>{
                if(err){
                    return res.status(403).send("Token invalido");
                } else {
                    req.user = user;
                    next();
                }

            })
        }
    }
    
}
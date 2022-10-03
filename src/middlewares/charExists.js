const db = require("../database/models");

const charExists = async (req, res, next) => {
    const {id} = req.params

    const protagonist = await db.Protagonist.findByPk(+id);

    if(!protagonist){
        return res.status(404).json({
            message: `El personaje con id ${id} no existe`
        })
    }
    req.protagonist = protagonist
    next()
}

module.exports = charExists
module.exports = (sequelize, dataType)=>{
    let alias="Protagonist";
    let cols={
        id:{
            type:dataType.INTEGER(11),
            primaryKey:true,
            allowNull: false,
            autoIncrement: true
        },
        name:{
            type: dataType.STRING(100),
            allowNull:false
        },
        image:{
            type:dataType.STRING(250),
            allowNull:false
        },
        age:{
            type:dataType.INTEGER(11)
        },
        weight:{
            type:dataType.INTEGER(11)
        },
        history:{
            type:dataType.STRING(500),
            allowNull:false
        }
    };
    let config={
        tableName:"protagonists",
        timestamps:false
    };

    const Protagonist = sequelize.define(alias, cols, config);

    Protagonist.associate=(models)=>{
        Protagonist.belongsToMany(models.Participation,{
            as:"participations",
            through:"protagonist_participation",
            foreignKey:"protagonist_id",
            otherKey:"participation_id",
            timestamps:false
        })
    }

    return Protagonist;
}
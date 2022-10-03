module.exports = (sequelize, dataType)=>{
    let alias="Participation";
    let cols={
        id:{
            type:dataType.INTEGER(11),
            primaryKey:true,
            allowNull: false,
            autoIncrement: true
        },
        title:{
            type: dataType.STRING(100),
            allowNull:false
        },
        image:{
            type:dataType.STRING(250),
            allowNull:false
        },
        release_date:{
            type:dataType.DATE,
            allowNull:false
        },
        rating:{
            type:dataType.INTEGER(11),
            allowNull:false
        },
        category_id:{
            type:dataType.INTEGER(11),
            allowNull:false
        },
    };
    let config={
        tableName:"participations",
        timestamps:false
    };

    const Participation = sequelize.define(alias, cols, config);

    Participation.associate=(models)=>{
        Participation.belongsToMany(models.Genre,{
            as:"genres",
            through:"participation_genre",
            foreignKey:"participation_id",
            otherKey:"genre_id",
            timestamps:false
        })

        Participation.belongsTo(models.Category,{
            as:"category",
            foreignKey:"category_id"
        })

        Participation.belongsToMany(models.Protagonist,{
            as:"characters",
            through:"protaganist_participation",
            foreignKey:"participation_id",
            otherKey:"protagonist_id",
            timestamps:false
        })
    }

    return Participation;
}
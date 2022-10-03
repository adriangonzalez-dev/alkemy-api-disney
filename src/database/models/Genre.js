module.exports = (sequelize, dataType)=>{
    let alias="Genre";
    let cols={
        id:{
            type:dataType.INTEGER(11),
            primaryKey:true,
            allowNull: false,
            autoIncrement: true
        },
        name:{
            type: dataType.STRING(50),
            allowNull:false
        }
    };
    let config={
        tableName:"genres",
        timestamps:false
    };

    const Genre = sequelize.define(alias, cols, config);

    Genre.associate=(models)=>{
        Genre.belongsToMany(models.Participation,{
            as:"participations",
            through:"participation_genre",
            foreignKey:"genre_id",
            otherKey:"participation_id",
            timestamps:false
        })
    }

    return Genre;
}
module.exports = (sequelize, dataType)=>{
    let alias="Category";
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
        tableName:"categories",
        timestamps:false
    };

    const Category = sequelize.define(alias, cols, config);

    Category.associate=(models)=>{

        Category.hasMany(models.Participation,{
            as:"participations",
            foreignKey:"category_id"
        })
    }

    return Category;
}
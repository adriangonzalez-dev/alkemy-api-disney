module.exports = (sequelize, dataType)=>{
    let alias="User";
    let cols={
        id:{
            type:dataType.INTEGER(11),
            primaryKey:true,
            allowNull: false,
            autoIncrement: true
        },
        username:{
            type: dataType.STRING(100),
            allowNull:false
        },
        email:{
            type:dataType.STRING(250),
            allowNull:false
        },
        pass:{
            type:dataType.STRING(100),
            allowNull:false
        }
    };
    let config={
        tableName:"users",
        timestamps:false
    };

    const User = sequelize.define(alias, cols, config);
    
    return User;
}
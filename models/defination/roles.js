const { Model, DataTypes } = require("sequelize")
const sequelize =  require('../../bin/dbConnection');

class Roles extends Model{}

Roles.init({
    roleId:{
        primaryKey:true,
        type: DataTypes.STRING(255)
    },
    name:{
        type: DataTypes.STRING(),
        allowNull:false,
    }
},{
    sequelize,
    timestamps:true,
    paranoid:true,
    modelName:'roles'
});

module.exports = Roles;
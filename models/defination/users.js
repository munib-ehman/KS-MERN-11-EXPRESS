const { Model, DataTypes } = require("sequelize");
const sequelize = require('../../bin/dbConnection');
const  jwt  = require("jsonwebtoken");
const config = require("../../config/config.json");
const { v4:uuidV4} = require("uuid");
const session = require("./sessions");




class Users extends Model{}


Users.init({
    userId:{
        primaryKey:true,
        type:DataTypes.STRING(255),
        unique:true
    },
    firstName:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING(255),
        allowNull: true
    },
    email:{
        type:DataTypes.STRING(255),
        allowNull:false,
        unique: true,
    },
    password:{
        type:DataTypes.STRING(255),
        allowNull: false
    },
},{
    hooks:{
        afterCreate: async (Users)=>{
            console.log(Users);
            const token = jwt.sign(Users.dataValues,config.jwt.secret,{
                expiresIn:"1h"
            });

            await session.create({
                sessionId:uuidV4(),
                token:token,
                userId:Users.dataValues.userId
            });

        }
    },
    sequelize,
    timestamps:true,
    paranoid:true,
    modelName:"users"
});

module.exports = Users;
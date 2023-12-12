const { Sequelize } = require("sequelize");
const config = require("../config/config.json");


const database = new Sequelize(config.db)

database.authenticate().then(()=>{
    console.log("DATABASE_CONNECTED")
}).catch((error)=>{
    console.log("DATABASE_CONNECTION_FAILS",error);
})


module.exports = database;




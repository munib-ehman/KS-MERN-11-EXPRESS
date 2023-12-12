const users  = require('./defination/users')
const roles = require('./defination/roles')
const sessions = require('./defination/sessions')
const sequelize  = require('../bin/dbConnection');

const models = { users, roles , sessions};

users.hasOne(roles,{foreignKey:"userId"});
roles.belongsTo(users,{foreignKey: "roleId"});

users.hasOne(sessions,{foreignKey: "userId"})
sessions.belongsTo(users,{foreignKey: "userId"})

const db={};

db.sequelize = sequelize;
sequelize.models = models;


module.exports = { db , models , sequelize}
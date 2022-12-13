const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize("cabs", "root", "Kratos@123", {
    host: 'localhost',
    dialect: 'mysql',
});


module.exports.sequelize = sequelize;
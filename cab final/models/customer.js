const {Sequelize, DataTypes} = require('sequelize')
const db = require('./db');

const Customer = db.sequelize.define('passenger',{
    passenger_id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    role:{
        type: DataTypes.STRING(50),
        allowNull:false
    },
    password:{
type: DataTypes.STRING(50),
allowNull:false,
    }

  
});


module.exports = Customer;


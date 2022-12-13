const {Sequelize, DataTypes} = require('sequelize')
const db = require('./db');

const Cab = db.sequelize.define('cab',{
    cab_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    cab_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true           
    },

    cab_capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cab_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    license_no :{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    driver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete:"cascade",
        references: {
            model: 'passengers',
            key: 'passenger_id'

    }
    }
});


module.exports = Cab;


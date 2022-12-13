const {Sequelize, DataTypes} = require('sequelize');
// const { FOREIGNKEYS } = require('sequelize/types/query-types');
const db = require('./db');




const Booking = db.sequelize.define('booking',{
    booking_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    passenger_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete:"cascade",
        references:{
            model:"passengers",
            key:"passenger_id"
        }
    },
    Pickup:{
        type:DataTypes.STRING(25),
        allowNull:false

    },
    Destination:{
        type:DataTypes.STRING(50),
        allowNull:false,
    },
    Date: {
        type: DataTypes.DATE,
        allowNull:false,
    },
    Time : {
        type: DataTypes.TIME,
        allowNull:false,
    }
});


module.exports = Booking;


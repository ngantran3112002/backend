const { Sequelize, DataTypes} = require('sequelize')
const sequelize = require('./Sequelize').sequelize;


const Order = sequelize.define('order', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
    },
    user_id: {
        type: DataTypes.STRING(100)
    },
    total: {
        type: DataTypes.DECIMAL(10,0)
    },
    payment_id : {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'orders',
    timestamps: true

})


module.exports = Order
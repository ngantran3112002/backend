const { Sequelize, DataTypes} = require('sequelize')
const sequelize = require('./Sequelize').sequelize;

const OrderDetail = sequelize.define('orderDetail',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    order_id: {
        type: DataTypes.INTEGER

    },
    product_id: {
        type: DataTypes.INTEGER
    },
    quantity: {
        type: DataTypes.INTEGER
    }
},{
    tableName: 'order_details',
    timestamps: true
})

// sequelize.sync({force: false})

module.exports = OrderDetail;
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
    quantityOrdered: {
        type: DataTypes.INTEGER
    },
    priceEach: {
        type: DataTypes.DECIMAL(10,2)
    }
},{
    tableName: 'order_details',
    timestamps: true
})



module.exports = OrderDetail;
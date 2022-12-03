const { Sequelize, DataTypes} = require('sequelize')
const sequelize = require('./Sequelize').sequelize;
const Order = require('./orderModel');
const Product = require('./productModel');

const OrderDetail = sequelize.define('orderDetail',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantityOrdered: {
        type: DataTypes.INTEGER
    },
    priceEach: {
        type: DataTypes.DECIMAL(10,2)
    }
},{
    tableName: 'order_details',
    // timestamps: true
})

// Order.hasMany(OrderDetail, {
//     foreignKey: 'order_id'
// });


Product.hasMany(OrderDetail, {
    foreignKey: 'product_id'
});
OrderDetail.belongsTo(Product, {
    foreignKey: 'product_id'
});

module.exports = OrderDetail;
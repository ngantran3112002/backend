const {Model, DataTypes} = require('sequelize')
const sequelize = require('./Sequelize').sequelize;

const OrderDetail = require('./orderDetails.model');
const User = require('./user.model')
const Product = require('./product.model')
// DATA BÊN FRONT GỬI SẼ NHƯ THẾ NÀY VÀ **** HÃY GỬI DƯỚI FORMAT JSON ****


const Order = sequelize.define('order', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    payment_id : {
        type: DataTypes.INTEGER
    },
    total: {
        type: DataTypes.DECIMAL(10,0)
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
    }
}, {
    tableName: 'orders',
    timestamps: true
})
// if A has a b_id column, then A belongsTo B
User.hasMany(Order, {foreignKey:"user_id"});
Order.belongsTo(User); // tao user_id ở model Order


Order.belongsToMany(Product, {through: OrderDetail, unique: false, foreignKey: 'orderId'});
Product.belongsToMany(Order, {through: OrderDetail, unique: true, foreignKey: 'productId'});



Product.hasMany(OrderDetail,
    {
        foreignKey: 'productId',  // You need to define the foreign key
    }
);
OrderDetail.belongsTo(Product, {
    foreignKey: 'productId'
});
Order.hasMany(OrderDetail, {
    foreignKey: 'orderId'
});
OrderDetail.belongsTo(Order, {
    foreignKey: 'orderId'
});



module.exports = Order

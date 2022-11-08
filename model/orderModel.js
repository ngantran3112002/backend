const {Model, DataTypes} = require('sequelize')
const sequelize = require('./Sequelize').sequelize;

const OrderDetail = require('./orderDetailsModel');
const User = require('./userModel')
const Product = require('./productModel')
// DATA BÊN FRONT GỬI SẼ NHƯ THẾ NÀY VÀ **** HÃY GỬI DƯỚI FORMAT JSON ****
// {
//     "user_id": 2,
//     "total": 0,
//     "payment_id": 2,
//     "thong tin lq den payment": {
//         payment Type
//         bn,
//         chon don vi ship nao,
//     }
//     "orderDetails": [  <--- đây là 1 array 
//         {
//             "product_id": 2,
//             "quantity": 2
//         },
//         {
//             "product_id": 2,
//             "quantity": 2
//         }
//     ]
// }

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
// if A has a b_id column, then A belongsTo B.
// Order.belongsTo(User, {as: 'orderOwner', foreignKey: 'user_id'}); // tao user_id ở model Order
// User.hasMany(Order, {as: 'ordered', foreignKey:"user_id"});
//db.food.hasMany(db.meal, {as : 'Food', foreignKey : 'idFood'});


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
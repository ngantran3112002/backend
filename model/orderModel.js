const {Model, DataTypes} = require('sequelize')
const sequelize = require('./Sequelize').sequelize;

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
        type: DataTypes.STRING(100)
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


module.exports = Order
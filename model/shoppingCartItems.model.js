// luu thong tin cac item trong gio hang 
const {DataTypes} = require('sequelize');
const sequelize = require('./Sequelize').sequelize;
const Product = require('./product.model');
const ShoppingSession = require('./shoppingCartModel');

const CartItem = sequelize.define('cart_item', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    session_id: {
        type: DataTypes.INTEGER
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: true
});



Product.hasMany(CartItem, {
    foreignKey: 'product_id'
});
CartItem.belongsTo(Product, {
    foreignKey: 'product_id'
});
ShoppingSession.hasMany(CartItem, {
    foreignKey: 'session_id'
});
CartItem.belongsTo(CartItem,{
    foreignKey: 'session_id'
});

module.exports = CartItem;

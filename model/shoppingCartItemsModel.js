// luu thong tin cac item trong gio hang 
const {DataTypes} = require('sequelize');
const sequelize = require('./Sequelize').sequelize;
const Product = require('./productModel');
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



Product.hasOne(CartItem, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

ShoppingSession.hasMany(CartItem, {
    foreignKey: 'session_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = CartItem;

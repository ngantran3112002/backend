// lưu giỏ hàng
const {DataTypes} = require('sequelize');
const sequelize = require('./Sequelize').sequelize;
const User = require('./userModel');

const ShoppingSession = sequelize.define('shopping_session', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    user_id : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
}, {
    freezeTableName: true,
    timestamps: true
});

User.hasOne(ShoppingSession, {
    foreignKey: 'user_id'
});
ShoppingSession.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = ShoppingSession;
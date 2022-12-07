const {DataTypes} = require('sequelize');
const sequelize = require('./Sequelize').sequelize;
const Order = require('./orderModel');

const StatusOrder = sequelize.define('status_order', {
    id: {
        type: DataTypes.TINYINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Chờ xác nhận"
    }
}, {
    freezeTableName: true,
    timestamps: false
})

StatusOrder.hasMany(Order, {
    foreignKey: 'status'
});
const { DataTypes } = require('sequelize');

const sequelize = require('./Sequelize').sequelize;

const User = sequelize.define('user',
    {
        id: {
            type: DataTypes.INTEGER,
            primarykey: true,
            autoIncrement: true,
            unique: true
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false

        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'user',
        timestamps: true,
    }
)

module.exports = User
const {Sequelize ,DataTypes } = require('sequelize');

const sequelize = require('./Sequelize').sequelize;
const Product = sequelize.define('product', 
    {
        id: {
            type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true
        },
        name:{
            type: DataTypes.STRING(255),
            unique: false,
            allowNull: false
        } ,
        description:{ type: DataTypes.STRING, defaultValue: 'không có link ảnh'},
        categoryId:{ type: DataTypes.INTEGER},
        quantityInStock:{ type: DataTypes.INTEGER(15), defaultValue: 10,},
        price: {
            type: DataTypes.DECIMAL(15,0),
            defaultValue: 0,

        },
        discountId: {type: DataTypes.INTEGER, defaultValue: 0},
        image: {type: DataTypes.STRING, defaultValue: `https://via.placeholder.com/150.png}`},
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'updated_at'
        },
    },
    {   
        tableName: 'products',
        timestamps: false,
    }
)



module.exports = Product;
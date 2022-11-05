const { DataTypes } = require('sequelize');

const sequelize = require('./Sequelize').sequelize;


const Product = sequelize.define('product', 
    {
        productId: {
            type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true
        },
        name:{
            type: DataTypes.STRING(255),
            unique: true
            
        } ,
        Description:{ type: DataTypes.STRING(255), defaultValue: 'khong co mo ta'},
        categoryId:{ type: DataTypes.INTEGER},
        quantity:{ type: DataTypes.INTEGER},
        price: {
            type: DataTypes.DECIMAL(15,4),

        },
        discountId: {type: DataTypes.INTEGER, defaultValue: 'none'},
        image: {type: DataTypes.STRING, defaultValue: 'khong co link anh'}
    },
    {
        tableName: 'products',
        timestamps: true,
    }
)

module.exports = Product;
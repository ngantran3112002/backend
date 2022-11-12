const {Sequelize ,DataTypes } = require('sequelize');

const sequelize = require('./Sequelize').sequelize;
const Category = require('./category.model')

const Product = sequelize.define('product', 
    {
        productId: {
            type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true
        },
        name:{
            type: DataTypes.STRING(255),
            unique: true
        } ,
        description:{ type: DataTypes.STRING(255), defaultValue: 'khong co mo ta'},
        categoryId:{ type: DataTypes.INTEGER, defaultValue: 0},
        quantityInStock:{ type: DataTypes.INTEGER, defaultValue: 0},
        price: {
            type: DataTypes.DECIMAL(15,0),
            defaultValue: 0000000,

        },
        discountId: {type: DataTypes.INTEGER, defaultValue: 0},
        image: {type: DataTypes.STRING, defaultValue: 'khong co link anh'}
    },
    {   
        
        tableName: 'products',
        timestamps: true,
    }
)
    
Category.hasMany(Product, {
    foreignKey : 'categoryId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Product.belongsTo(Category)

module.exports = Product;

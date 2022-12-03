const Order = require('./order.model')
const OrderDetail = require('./orderDetails.model')
const Product = require('./product.model')
const User = require('./user.model')
const Payment = require('./payment.model')
const Category = require('./category.model')
const UserDetails = require('./userDetails.model')
const Admin = require('./admin.model')


// Order.sync();
// OrderDetail.sync();
// User.Sync();



Category.hasMany(Category,{
    foreignKey: 'parentId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});


// if A has a b_id column, then A belongsTo B
User.hasMany(Order, {foreignKey:"user_id"});
Order.belongsTo(User,{foreignKey:"user_id"}); // tao user_id ở model Order

// Order - Product
Order.belongsToMany(Product, {through: OrderDetail, unique: false, foreignKey: 'orderId'});
Product.belongsToMany(Order, {through: OrderDetail, unique: true, foreignKey: 'productId'});

Order.hasMany(OrderDetail, {
    foreignKey: 'orderId'
});
Product.hasMany(OrderDetail,
    {
        foreignKey: 'id',  // You need to define the foreign key
    }
);

OrderDetail.belongsTo(Product, {
    foreignKey: 'productId'
});
OrderDetail.belongsTo(Order, {
    foreignKey: 'orderId'
});

//user and details
// User.hasOne(UserDetails); 
// UserDetails.belongsTo(User); 

// if A has a b_id column, then A belongsTo B
Category.hasMany(Product, {foreignKey:"categoryId"});
Product.belongsTo(Category); // tao user_id ở model Order

const Model = {
    User, Order, OrderDetail,
    Product, Category, Payment, Admin
}


module.exports = {
    Model
}
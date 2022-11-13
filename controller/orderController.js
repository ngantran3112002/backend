
const asyncHandler = require('express-async-handler')
const database = require('../configs/database')
// const sequelize = require('../model/Sequelize').sequelize
const Order = require('../model/order.model')
const OrderDetail = require('../model/orderDetails.model');
const Payment = require('../model/payment.model');
const User = require('../model/user.model')
const { where } = require('sequelize');
const Product = require('../model/product.model');




const insertDetails = 'INSERT INTO admin.order_details (order_id, product_id, modified_at, quantity, created_at) VALUES(?, ?, CURRENT_TIMESTAMP, ?, CURRENT_TIMESTAMP);'


const getOrderDetails = asyncHandler(async (req, res, next) => {

    const orderID = req.body["orderId"];
    // const order = await Order.findByPk(orderID);
    const data = await Order.findAll({include: Product, where: {id: orderID}})
    res.json(data)
    

})


module.exports = {
    getOrderDetails
}
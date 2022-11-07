
const asyncHandler = require('express-async-handler')
const database = require('../configs/database')
const sequelize = require('../model/Sequelize').sequelize
const Order = require('../model/orderModel')
const OrderDetail = require('../model/orderDetailsModel');
const Payment = require('../model/paymentModel');
const User = require('../model/userModel')
const { where } = require('sequelize');



const insertDetails = 'INSERT INTO admin.order_details (order_id, product_id, modified_at, quantity, created_at) VALUES(?, ?, CURRENT_TIMESTAMP, ?, CURRENT_TIMESTAMP);'


const getOrderInfo = asyncHandler(async (req, res) => {
    const orderID = req.orderID;
    let userId = req.userId;
    // const data  = [{}]
    const data = await OrderDetail.findAll({
        where: {
            order_id: {
                [Op.eq]: orderID
            }
        }
    })

    const paymentInfo = await Payment.findAll({
        where: {

        }
    })
   
   return res;
})


module.exports = {
    getOrderInfo
}
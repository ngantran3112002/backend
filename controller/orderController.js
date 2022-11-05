
const asyncHandler = require('express-async-handler')
const database = require('../configs/database')
const sequelize = require('../model/Sequelize').sequelize
const Order = require('../model/orderModel')
const OrderDetail = require('../model/orderDetailsModel');


const insertDetails = 'INSERT INTO admin.order_details (order_id, product_id, modified_at, quantity, created_at) VALUES(?, ?, CURRENT_TIMESTAMP, ?, CURRENT_TIMESTAMP);'


const addOrder = asyncHandler(async (req, res) => {
    const [req_user_id, req_total, req_payment_id, req_orderDetails] = [req.body['user_id'], req.body['total'], req.body['payment_id'], req.body['orderDetails']];
   
    await sequelize.transaction(async (transaction)=> {
        const createOrder = await Order.create({
            user_id: req_user_id,
            total: req_total,
            payment_id: req_payment_id
        },{transaction})
        const orderId = createOrder.get('id');
        const data = req_orderDetails.map(obj => ({'order_id': orderId,...obj}));
        console.log(data);
        await OrderDetail.bulkCreate(data)
        .then(data => {
            res.status(200).json(data);
        }).catch( err => {
            console.log(err);
            res.status(500).json({msg:"error", details : err})
        })
    })
    
   
   return res;
})


module.exports = {
    addOrder
}
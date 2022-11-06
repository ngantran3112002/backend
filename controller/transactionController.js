//handle khi người dùng xác nhận order
const asyncHandler = require('express-async-handler');
const sequelize = require('../model/Sequelize').sequelize;
const Order = require('../model/orderModel');
const OrderDetail = require('../model/orderDetailsModel');
const Payment = require('../model/paymentModel');
const Product = require('../model/productModel');

const startTransaction = asyncHandler(async (req, res) => {
    const [req_user_id, req_total, req_orderDetails] = [req.body['user_id'], req.body['total'] ,req.body['orderDetails']];
    // console.log(req_orderDetails.length   req_orderDetails[i].product_id)
    for (i = 0; i , i < req_orderDetails.length; i++) {
        await Product.decrement({quantityInStock: req_orderDetails[i].quantityOrdered},{where: {productId:req_orderDetails[i].product_id }})
    }
    

    await sequelize.transaction( (t) => {
        return  Payment.create({payment_type: true,},{transaction: t})
        .then((payment)=> { return  Order.create({
                user_id: req_user_id,
                payment_id: payment['id'],
                total: req_total,},{transaction: t})
                .then((order) => {
                    // res.json(order)
                    const orderId = order['id'];
                    const data = req_orderDetails.map(obj => ({'order_id': orderId,...obj}));
                    // res.json(data);
                    console.log(data);
                    return  OrderDetail.bulkCreate(data, {transaction: t})
                        .then((orderDetails) => {
                            return res.json(orderDetails)
                     })
                        .catch( (err) => {
                            console.err(err)
                        }
                    )}
                )
        }).catch((err) => {
            res.json(err);
        })
    })
   return res.json(req_orderDetails);
})

module.exports = {
    startTransaction
}
//handle khi người dùng xác nhận order
const asyncHandler = require('express-async-handler');
const sequelize = require('../model/Sequelize').sequelize;
const Order = require('../model/order.model');
const OrderDetail = require('../model/orderDetails.model');
const Payment = require('../model/payment.model');
const Product = require('../model/product.model');
const { or } = require('sequelize');


const startTransaction = asyncHandler(async (req, res,next) => {
    const [req_user_id, req_total, req_orderDetails] = [req.body['user_id'], req.body['total'], req.body['orderDetails']];
    try {
        await sequelize.transaction(async(t1) => {
            //tạo order
            const order = await Order.create(
                {
                    user_id: req_user_id,
                    payment_id: 2,
                    total: req_total,
                    status: true,
                }, {transaction: t1}
            )
            await order.save()
            //lấy data     
            const products = [req_orderDetails]
            //tìm từng prod    
            for (i = 0; i < products.length; i++) {
                    const product = await Product.findOne({
                    where: {
                        productId: products[i].productId,
                    }
                }, {transaction: t1})
            //với thêm từng product trong vừa tìm được insert vô bảng chung
                await order.addProduct(product, {
                    through: {
                        quantityOrdered: products[i].quantity,
                        priceEach: products[i].priceEach
                    }
                 }, {transaction: t1})
            }
        })
        res.status(200).json({
            message: "Đặt hàng thành công",
            stastus:  200
        });
    } catch (err) {
        next(err, req, res, next);
    }
    
    
    
    
})

module.exports = {
    startTransaction
}
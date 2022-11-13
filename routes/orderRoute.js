const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controller/orderController')

const auth = require("../auth/verifyToken")
// orderRouter.post('/add', orderController.addOrder)
orderRouter.get('/details',auth.verifyController ,orderController.getOrderDetails)
orderRouter.get('/detailsTest',orderController.getOrderDetails)

module.exports = orderRouter
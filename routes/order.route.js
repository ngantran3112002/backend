const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controller/order.controller')

const auth = require("../auth/verifyToken")
// orderRouter.post('/add', orderController.addOrder)
orderRouter.get('/details',auth.verifyController ,orderController.getOrderDetails)
orderRouter.get('/detailsTest',orderController.getOrderDetails)
// orderRouter.get('/user/all', orderController.getAllOrder)
orderRouter.post('/add/create', orderController.createOrder)
orderRouter.get('', orderController.getAllOrder)
orderRouter.delete("/:id", orderController.deleteOrder)
orderRouter.post("/:id", orderController.editOrder)
orderRouter.get("/:id", orderController.getOrderDetails)
orderRouter.get("/alltest/test", orderController.getAll)

module.exports = orderRouter
const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controller/orderController')

orderRouter.post('/add', orderController.addOrder)

module.exports = orderRouter
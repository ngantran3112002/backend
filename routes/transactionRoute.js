const express = require('express');
const transactionRouter = express.Router();
const transactionController = require('../controller/transactionController')

transactionRouter.post('/add', transactionController.startTransaction)

module.exports = transactionRouter ;
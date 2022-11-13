const express = require('express');
const transactionRouter = express.Router();
const transactionController = require('../controller/transactionController')
const auth = require("../auth/verifyToken")

transactionRouter.post('/add', auth.verifyController, transactionController.startTransaction)

module.exports = transactionRouter ;
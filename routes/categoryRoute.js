const express = require('express')
const categoryRouter = express.Router()
const categoryController = require('../controller/categoryController')
const auth = require("../auth/verifyToken")

categoryController.get('/all',auth.verifyController, categoryController.getAllCategory)

router.get('/id',auth.verifyController ,categoryController.getCategoryByParentId)

module.exports = categoryRouter
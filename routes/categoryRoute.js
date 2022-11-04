const express = require('express')
const router = express.Router()
const categoryController = require('../controller/categoryController')

router.get('/all', categoryController.getAllCategory)

router.get('/id', categoryController.getCategoryByParentId)

module.exports = router
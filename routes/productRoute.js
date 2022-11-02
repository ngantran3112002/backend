const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

router.get('/all', productController.getAllProducts)
router.get('/detail', productController.getProductDetail)


module.exports = router;


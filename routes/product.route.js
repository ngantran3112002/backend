const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');
const auth = require("../auth/verifyToken")
const asyncHandler = require('express-async-handler')
const path = require('path')
const multer  = require('multer')


// console.log(path.join(__dirname, '/publics/images'))
const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
      cb(null, path.resolve('public/images'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
    }
})

const upload = multer({ storage: storage ,limits: { fieldSize: 10 * 1024 * 1024 } }); //10MB


router.get('/all', auth.verifyController, asyncHandler(productController.getAllProducts))
router.get('/detail', auth.verifyController, productController.getProductDetail)
router.get('/detail/:productId', asyncHandler(productController.getProductDetail))
router.get('/alltest', asyncHandler(productController.getAllProducts))
router.get('/pagetest/:page', asyncHandler(productController.getProductList));
router.post('/:productId', asyncHandler(productController.updateProduct))
router.post('/addProduct/add',upload.single('image') ,asyncHandler(productController.addProduct))
router.delete('/:productId', asyncHandler(productController.deleteProduct))

// router.get()

module.exports = router;

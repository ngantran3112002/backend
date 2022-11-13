const {
    createProduct,
    getProductByProductId,
    getProducts,
    updateProduct,
    deleteProduct,
} = require('../controller/admin/admin.product.controller');
const {login} = require("../controller/admin/admin.login.controller")
const router = require('express').Router();
const {checkToken} = require('../middleware/token_validation');
const {upload} = require('../middleware/upload');

router.post('/products', checkToken,upload.single('image'),createProduct);
router.get('/products/:id',checkToken, getProductByProductId);
router.get('/products', checkToken,getProducts);
router.patch('/products/:id', checkToken,upload.single('image'),updateProduct);
router.delete('/products/:id', checkToken,deleteProduct);
router.post('/login',login);

module.exports = router;
const {
    createProduct,
    getProductByProductId,
    getProducts,
    updateProduct,
    deleteProduct,
} = require('../controller/admin/admin.product.controller');
const {login} = require("../controller/admin/admin.login.controller")
const router = require('express').Router();
const {checkToken} = require('../auth/middleware/token_validation');
const {upload} = require('../auth/middleware/upload');
const {changeStatus} = require('../controller/admin/admin.statusOrder.constroller')

router.post('/products', checkToken,upload.single('image'),createProduct);
router.get('/products/:id',checkToken, getProductByProductId);
router.get('/products', checkToken,getProducts);
router.patch('/products/:id', checkToken,upload.single('image'),updateProduct);
router.delete('/products/:id', checkToken,deleteProduct);
router.post('/login',login);
router.patch('/changeStatus/:id', changeStatus);

module.exports = router;
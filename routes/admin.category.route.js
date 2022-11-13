const {
    createCategory,
    getCategoryByCategoryId,
    getCategories,
    updateCategory,
    deleteCategory,
} = require('../controller/admin/admin.category.controller');

const router = require('express').Router();
const {checkToken} = require('../middleware/token_validation');
const {upload} = require('../middleware/upload');

router.post('/category', checkToken,upload.single('image'),createCategory);
router.get('/category/:id',checkToken, getCategoryByCategoryId);
router.get('/category', checkToken,getCategories);
router.patch('/category/:id',checkToken,upload.single('image'),updateCategory);
router.delete('/category/:id', checkToken,deleteCategory);


module.exports = router;
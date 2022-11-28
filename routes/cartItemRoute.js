const router = require('express').Router();
const {checkToken} = require('../middleware/token_validation');
const {createCartItem, deleteCartItem}  = require('../controller/cartItemController');

router.post('/cartItem', checkToken, createCartItem);
router.delete('/cartItem/id', checkToken, deleteCartItem);

module.exports = router;

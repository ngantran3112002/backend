const asyncHandler = require('express-async-handler')
const database = require('../configs/database')


const addOrder = asyncHandler((req, res) => {
    const [user_id, total, payment_id, orderDetails] = [req.body.user_id, req.body.total, req.body.payment_id, req.body.orderDetails];
    console.log(req.body.user_id);
    database.pool.query('INSERT INTO `admin`.`orders` (`user_id`,`total`,`payment_id`,`created_at`,`modified_at`) VALUES(?,?,LAST_INSERT_ID(),current_timestamp(),current_timestamp());',
    [user_id, total, payment_id],
    (err, results, fields) => {
        if (err) {
            console.error(err.message)
        }
        console.log(results.insertID)
    }
    )
    
    return res.json({
        message: 'done'
    })
})


module.exports = {
    addOrder
}
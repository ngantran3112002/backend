const CartItem = require('../model/shoppingCartItemsModel');
const Shopping_session = require('../model/shoppingCartModel'); 
const Product = require('../model/productModel');
const { sequelize } = require('../model/Sequelize');
module.exports = {
    createCartItem: async(req, res) => {
        const data = req.body;
        try {
            await CartItem.create({
                product_id: data.product_id,
                session_id: data.session_id,
                quantity: data.quantity
            });
            
        } catch(error) {
            return res.status(500).json({
                "success": 0,
                "message": error
            })
        }

        const [results, metadata] = await sequelize.query(`SELECT price from products where productid = ${data.product_id}`);
        let ss = await Shopping_session.findAll({
            attributes: ['total'],
            where: {
                id: data.session_id
            }
        });
        let total = ss[0].total;
        console.log(total);
        total += results[0].price * data.quantity;
        console.log(total)
        try {
            await Shopping_session.update({total: total}, {
                where: {
                    id: data.session_id
                }
            })
        }catch(error) {
            return res.status(500).json({
                "success": 0,
                "message": "fail to update shopping sesson"
            });
        }

        return res.status(200).json({
            "success": 1,
            "message": "created successfully"
        })
    },

    deleteCartItem: async(req, res) => {
        const data = req.body;

        try {
            await CartItem.destroy({
                where: {
                    id: req.params.id
                }
            });
        } catch(error) {
            return res.status(500).json({
                "success": 0,
                "message": error
            });
        }
    }
}
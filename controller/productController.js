
const database = require('../configs/database')
const sequelize = require('../model/Sequelize').sequelize
const Product = require('../model/product.model')

const getAllProducts = async (req, res) => {
    const [rows,field] = await database.pool.execute('SELECT *\n' +
        'FROM admin.products;')
    return res.json({
        data: rows
    })
}

const getProductDetail = async (req, res) => {
    const productID = req.body.id;
    console.log(productID)
    const statement = 'SELECT id, name, Description, category_id, quantity, price, discount_id, image, createdDate, modifiedDate FROM admin.products WHERE id = ?;'

    const [rows,fields] = await database.pool.query(statement,[productID]);
    return res.json({
        data: rows
    })

}


module.exports = {
    getAllProducts,
    getProductDetail
}

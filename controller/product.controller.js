
const { createConfigItemSync } = require('@babel/core')
const { Sequelize, Op } = require('sequelize')
// const sequelize = require('../model/Sequelize').sequelize
const Product = require('../model/product.model')
const { sequelize } = require('../model/Sequelize')

const getAllProducts = async (req, res,next) => {
    await Product.findAll()
        .then((data) => res.json(data)) 
        .catch((err) => {
            const e = new Error("có lỗi khi fetch data từ server")
            e.stack = e
            next(e, req, res, next)
        }) 
}

const getProductList = async(req, res, next) => {
    let page = !isNaN(req.query.page) || !(req.query.page == null)  ? req.query.page : 1;
    let category =  parseInt(req.query.category);
    const total = await Product.count();
    
    if (category && page) {
        category = parseInt(category)
        page = parseInt(page)
        const totalCate = await Product.count({where: {categoryId : parseInt(category)}})
        let skip = (page - 1) * 9
        await Product.findAll({
            where: {
                categoryId: category
            },
            offset: skip,
            limit: 9
        }).then( data => {
            return res.status(200).json({
                data,
                total: totalCate
            })
        })
    } else if (category) {
        category = parseInt(category)
        const totalCate = await Product.count({where: {categoryId : parseInt(category)}})
        await Product.findAll({
            where: {
                categoryId: category,
            }
        }).then( data => {return res.status(200).json({data, total: totalCate})})
    } 
    else if (page) {
        page = parseInt(page)
        let skip = (page - 1) * 9
        Product.findAll({
            offset: skip,
            limit: 9
        }).then( data => {return res.status(200).json({data, total: total})})
    } else {
        Product.findAll({
            // limit: 9
        }).then(data => {return res.status(200).json({data, total: total})})
    }
}

const getProductByCategory = async (req, res,next) => {
    
    await Product.count({where: {categoryId: parseInt(req.query.category)}})
        .then((data) => res.json(data)) 
        .catch((err) => {
            const e = new Error("có lỗi khi fetch data từ server")
            e.stack = e
            next(e, req, res, next)
    })
}

const getTotalProduct = async (req, res,next) => {
    await Product.count()
        .then((data) => res.json(data)) 
        .catch((err) => {
            const e = new Error("có lỗi khi fetch data từ server")
            e.stack = e
            next(e, req, res, next)
    }) 
}


const getProductDetail = async (req, res, next) => {
    const productID = req.body["productID"];
    const rows = await Product.findOne({
        where: {
            productId: productID,
        }
    })
    if (rows) {
        return res.status(200).json({
            rows
        })
    } else {
        const err = new Error('Không tìm thấy sản phẩm cần tìm')
        next(err, req, res, next)
    }
}

module.exports = {
    getAllProducts,
    getProductDetail,
    getProductList

}

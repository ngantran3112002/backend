const { createConfigItemSync } = require("@babel/core");
const { Sequelize, Op } = require("sequelize");
const path = require("path");
console.log(path.join(__dirname, "/publics/images"));

// const sequelize = require('../model/Sequelize').sequelize
const Product = require("../model/product.model");
const { sequelize } = require("../model/Sequelize");
// const querystringConverter = require('sequelize-querystring-converter');
const queryParser = require("sequelize-query")(sequelize);

function reverseFormatNumber(val, locale) {
  var group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, "");
  var decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, "");
  var reversedVal = val.replace(new RegExp("\\" + group, "g"), "");
  reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");
  return Number.isNaN(reversedVal) ? 0 : reversedVal;
}

const getAllProducts = async (req, res, next) => {
  await Product.findAll()
    .then((allProducts) => res.status(200).json({ allProducts }))
    .catch((err) => {
      const e = new Error("có lỗi khi fetch data từ server ở getAllProducts");
      e.stack = err;
      next(e, req, res, next);
    });
};

const getProductList = async (req, res, next) => {
  let finalQuery = await queryParser.parse(req);

  const page = !req.params.page ? 1 : req.params.page;
  const skip = (page - 1) * 9;
  finalQuery = { ...finalQuery, offset: skip, limit: 9 };
  let total = 0;
  if (req.query.categoryId) {
    total = await Product.count({
      where: { categoryId: parseInt(req.query.categoryId) },
    });
  } else {
    total = await Product.count();
  }

  await Product.findAll(finalQuery)
    .then((products) => {
      // data = {...data}
      // console.log(products)
      return res.status(200).json({ products, total: total });
    })
    .catch((err) => {
      const newErr = new Error("có lỗi khi fetch data từ server ở prodList");
      newErr.stack = err;
      next(newErr, req, res, next);
    });
};

const getProductByCategory = async (req, res, next) => {
  await Product.count({ where: { categoryId: parseInt(req.query.category) } })
    .then((data) => res.json(data))
    .catch((err) => {
      const e = new Error("có lỗi khi fetch data từ server");
      e.stack = e;
      next(e, req, res, next);
    });
};

const updateProduct = async (req, res, next) => {
  console.log(parseInt(reverseFormatNumber(req.body.price, "vi")));
  const product = await Product.findByPk(req.body.id);

  product.set({
    name: req.body.name,
    description: req.body.description,
    quantityInStock: req.body.quantityInStock,
    price: parseInt(reverseFormatNumber(req.body.price, "vi")),
  });

  await product.save();
  return res.json("abc");
};

const getProductDetail = async (req, res, next) => {
  const productId = req.params.productId;
  // console.log(req.params.p)
  return await Product.findOne({
    where: {
      id: productId,
    },
  })
    .then((productDetail) => {
      return res.status(200).json(productDetail);
    })
    .catch((err) => {
      const newErr = new Error("Không tìm thấy sản phẩm cần tìm");
      newErr.stack = err;
      next(newErr, req, res, next);
    });
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;

  const product = await Product.findByPk(productId);
  console.log(product);
  if (product === null) {
    return res.status(500).json("Không thấy sản phẩm");
  } else {
    await product.destroy();
    return res.status(200).json("Xóa thành công");
  }
};

const addProduct = async (req, res, next) => {
  // console.log()
  console.log(req.body);
  console.log(req.file);
  const newProd = Product.build({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantityInStock: req.body.quantityInStock,
    image: req.file ? `/static/images/${req.file.filename}` : ''
  });

  await newProd.save()

  return res.status(200).json("success");
};

module.exports = {
  getAllProducts,
  getProductDetail,
  getProductList,
  deleteProduct,
  updateProduct,
  addProduct,
};

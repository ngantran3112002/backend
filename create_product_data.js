const Product = require('./model/product.model');
const products = require('./productdata');

(async() =>{
    for(let i = 1; i < 25; i++) {
        const x =await Product.create({
        name: "SP - FAKE" + i*100,
        description: "khong co mo ta",
        categoryId: Math.floor(Math.random() * (5 - 1 + 1) + 1),
        image : "none",
        quantityInStock: 2,
        price: 100000 + i * 25,
        }).then();
    }
})();





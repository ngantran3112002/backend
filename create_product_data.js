const Product = require('./model/product.model');
const products = require('./productdata');

(async() =>{
    for(let i = 1; i < 25; i++) {
        const x =await Product.create({
        name: "SP - FAKE" + i,
        description: "khong co mo ta",
        categoryId: "1",
        image : "none",
        quantityInStock: 2,
        price: 100000,
        }).then();
    }
})();





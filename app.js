const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')

// const productRouter = require('./routes/productRoute')
const categoryRouter = require('./routes/category.route')
const productRouter = require('./routes/product.route')
const orderRouter = require('./routes/order.route')
const adminProductRouter = require("./routes/admin.product.route");
const adminCategoryRouter = require("./routes/admin.category.route");
const userRouter = require("./routes/user.route");
const { notFound, errHandler } = require('./auth/middleware/error');

const sequelize = require('./model/Sequelize').sequelize;
//model
// const User = require('./model/userModel'); 

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync({alter: true, force: false}).then(() => console.log("done")).catch((err) => console.log(err));
const model = require('./model/index')


app.use('/categories', categoryRouter);
app.use('/orders', orderRouter);
app.use('/adminProducts', adminProductRouter)
app.use('/adminCategories', adminCategoryRouter)
app.use('/products', productRouter);
app.use('/users', userRouter)


app.use(notFound);
app.use(errHandler);



app.get('/', (req, res) => {
    res.send("WORK")
})



app.listen(5000, () => {
    console.log("Running")
})

module.exports = app;

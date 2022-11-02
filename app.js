const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// const productRouter = require('./routes/productRoute')
const categoryRouter = require('./routes/categoryRoute')
const productRouter = require('./routes/productRoute')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/category', categoryRouter);
app.use('/product', productRouter);

app.listen(5000, () => {
    console.log("Running")
})

module.exports = app;

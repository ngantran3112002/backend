const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const routers = require('./routes')
const { notFound, errHandler } = require('./auth/middleware/error');

 

const sequelize = require('./model/Sequelize').sequelize;
//model
// const User = require('./model/userModel'); 
const model = require('./model/index')

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(cookieParser());
app.use('/static', express.static('public'))
app.use(express.static(path.join(__dirname, '../build')));

// sequelize.sync({force: true}).then(() => console.log("done")).catch((err) => console.log(err));
// const model = require('./model/index')


// app.use('/comment', commentRouter)
app.use('/api',routers)

app.use(notFound);
app.use(errHandler);

app.get('/api', (req, res) => {
    res.send("WORK")
})



app.listen(3001, () => {
    console.log("Running")
})

module.exports = app;

var express = require('express');
require('dotenv').config();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const productRouter = require('./routes/products');
const bodyParser = require('body-parser');

var app = express();
var cors = require('cors');
const mongoose = require('mongoose');
MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// allow cross origin requests
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// /api/v1/products
app.use(bodyParser.json());
app.use('/api/v1/products', productRouter);

module.exports = app;

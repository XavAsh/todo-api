var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv').config();
const cors = require("cors");

require('./models')

const indexRouter = require('./routes/index');
const taskRouter = require('./routes/task');
const legacyTaskRouter = require('./routes/legacyTask');
var loggerMiddleware = require('./middleware/logger');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(loggerMiddleware);

app.use('/', indexRouter);
app.use('/task', taskRouter);
app.use('/legacyTask', legacyTaskRouter);



module.exports = app;

const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const userRouter = require('./router/userRouter');
const productRouter = require('./router/productRouter');
const chatRouter = require('./router/chatRouter');
const errorHandle = require('./controller/errorHandleController');
const AppError = require("./utils/appError");
const app = new express();

var cors = require('cors');

app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


// // Limit requests from same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!'
// });
// app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({limit: '10kb'}));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());
// Prevent parameter pollution
// app.use(
//   hpp({
//     whitelist: [
//       'duration',
//       'ratingsQuantity',
//       'ratingsAverage',
//       'maxGroupSize',
//       'difficulty',
//       'price'
//     ]
//   })
// );
app.use(cors());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/chat', chatRouter);
var cookieParser = require('cookie-parser')
app.use(cookieParser())
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/api/v1/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorHandle);

module.exports = app;



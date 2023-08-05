const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('dotenv');
const morgan = require("morgan");
const productCache = require("./redis/productCache");
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


dotenv.config({ path: './config.env' });
const app = require('./app');
const url = require("url");

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
      console.log('DB connection successful!')

  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message, err);
  server.close(() => {
    process.exit(1);
  });
});
productCache.cacheTopProductViewscheduler(3, 12);

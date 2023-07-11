const express = require('express');
const catchAsync = require('../utils/CatchError');
const authController = require('../controller/authController');
const authSerivce = require('../service/user/authService');
const productController = require('../controller/productController');

const router = express.Router();

router.route('/createProduct').post(catchAsync(authSerivce.protect),catchAsync(productController.createProduct));
router.route('/getAllProduct').get(catchAsync(productController.getAllProduct));

module.exports = router;
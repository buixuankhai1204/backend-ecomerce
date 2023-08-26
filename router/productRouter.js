const express = require('express');
const catchAsync = require('../utils/CatchError');
const authController = require('../controller/authController');
const authSerivce = require('../service/user/authService');
const productController = require('../controller/productController');
const productScore = require('../service/product/productScore');
const productService = require('../service/product/productService');
const productCache = require('../redis/productCache');
const router = express.Router();

router.route('/createProduct').post(catchAsync(productController.createProduct));
router.route('/getAllProduct').get(catchAsync(productController.getAllProduct));
router.route('/getProduct/:id').get(catchAsync(productScore.updateProductScore),catchAsync(productCache.productIdCacheData),catchAsync(productController.getProduct));
router.route('/getTopProductView').get(catchAsync(productCache.getTopScoreProduct), catchAsync(productCache.setTop10ScoreProduct));
router.route('/score/:id').post(catchAsync(productScore.updateProductScore));

module.exports = router;
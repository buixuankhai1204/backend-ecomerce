const express  = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const authService = require('../service/user/authService');
const catchError = require('../utils/CatchError');
const router = express.Router();

router.route('/getAllUser').get(catchError(authService.protect),catchError(userController.apiGetAllUser));
router.route('/getUser').get(catchError(authService.protect),catchError(userController.getUser));
router.route('/updateUser/:id').patch(catchError(authService.protect),catchError(userController.apiUpdateUser));
router.route('/me').get(catchError(authService.protect),catchError(userController.apiGetCurrentUser));

router.route('/signup').post(catchError(authController.signUp));
router.route('/signin').post(catchError(authController.signIn));
router.route('/forgotPassword').post(catchError(authController.forgotPassword));
router.route('/resetPassword/:token').patch(catchError(authController.resetPassword));

module.exports = router;
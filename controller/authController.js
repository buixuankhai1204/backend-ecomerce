const mongoose = require('mongoose');
const authService = require('../service/user/authService');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/CatchError');
const userModel = require('../model/userModel');
module.exports = class Auth {
    static async signUp(req, res, next) {
        console.log(req.formData);
        const user = await authService.signUp(req.body, res);
        // const user = catchAsync(await factoryApi.createDocument(userModel, req.body, next));
        if (user) {
            res.status(200).json({
                status: 'success',
                data: user[0],
                token: user[1]
            })
        }
    }

    static async signIn(req, res, next) {
        const user = await authService.signIn(req.body, res, next);
        if (user) {
            res.status(200).json({
                status: 'success',
                data: user[0],
                token: user[1]
            })
        }
    }

    static async forgotPassword(req, res, next) {
        const info = await authService.forgotPassword(req.body, next);
        if (info) {
            res.status(200).json({
                status: 'success',
                message: 'gửi mail quên mật khẩu thành công',
            })
        }
    }

    static async resetPassword(req, res, next) {
        const user = await authService.resetPassword(req, req.params.token, res, next);
        if (user) {
            res.status(200).json({
                status: 'success',
                data: user,
                message: 'gửi mail quên mật khẩu thành công',
            })
        }
    }

    static async updateStatusUserOnlineOrOffLine(req, res, next) {
        const userStatus = await authService.updateStatusUserOnlineOrOffLine(req, next);
        if (userStatus) {
            res.status(200).json({
                status: 'success',
                data: userStatus,
                message: 'Update Thông tin user thành công!',
            })
        }
    }

    static async getUserInfoByUsername(req, res, next) {
        const userInfo = await authService.getUserInfoByUsername(req, next);

        if (userInfo) {
            res.status(200).json({
                status: 'success',
                data: userInfo,
                message: 'Update Thông tin user thành công!',
            })
        }
    }
}
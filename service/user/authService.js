const mongoose = require('mongoose');
const userModel = require('../../model/userModel');
const AppError = require('../../utils/appError');
const jwt = require('jsonwebtoken');
const {sign} = require("jsonwebtoken");
const {promisify} = require('util');
const sendMail = require('../mail/sendMailService');
const crypto = require("crypto");
const shoppingSessionModel = require('../../model/shoppingSessionModel');
const factoryApi = require('../../utils/factoryApiService');
const userStatusModel = require('../../model/userStatusModel')
module.exports = class Auth {

    static signToken(id) {
        return jwt.sign({
            expires: process.env.SECRET_DAY_KEY,
            data: id
        }, process.env.SECRET_TOKEN_KEY);
    }

    static createToken(user, res, statusCode) {
        const token = this.signToken(user._id);
        const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        };
        if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

        res.clearCookie('jwt');
        res.clearCookie('userId');
        res.cookie('jwt', token);
        res.cookie('userId', user._id.toString());

        user.password = undefined;
        return token;
    }

    static async signUp(requestBody, res) {
        const user = await userModel.create({
            name: requestBody.name,
            email: requestBody.email,
            password: requestBody.password,
            passwordConfirm: requestBody.passwordConfirm
        });
        const token = this.createToken(user, res, 201);
        const shoppingSession = await shoppingSessionModel.create({
            user: user._id,
            total: 0,
        });
        if (!shoppingSession) {
            return next(new AppError('không tạo được giỏ hàng', 401));
        }
        return [user, token];
    }

    static async signIn(requestBody, res, next) {
        const {password, email} = requestBody;
        if (!email || !password) {
            return next(new AppError('bạn chưa nhập email hoặc mật khẩu!', 401));
        }

        const user = await userModel.findOne({email: email}).select('+password');
        if (!user) {
            return next(new AppError('email không tồn tại, vui lòng nhập lại email', 401));
        }

        if (!await user.correctPassword(password, user.password)) {
            return next(new AppError('sai mật khẩu, vui lòng nhập lại mật khẩu khác', 401));
        }

        user.token = this.createToken(user, res, 200);
        return [user, user.token];
    }

    static async protect(req, res, next) {
        if (!req.headers.authorization) {
            return next(new AppError('bạn chưa đăng nhập, vui lòng đăng nhập để truy cập trang'));
        }
        let tokenHeader = "";
        if (req.headers.authorization.startsWith('Bearer')) {
            tokenHeader = req.headers.authorization.split(' ');
        }
        const token = tokenHeader[1];
        var decoded = await promisify(jwt.verify)(token, process.env.SECRET_TOKEN_KEY);
        const user = await userModel.findById(decoded.data);
        if (!user) {
            return next(new AppError('người dùng này đã bị xóa, vui lòng đăng nhập bằng tài khoản khác', 401));
        }

        req.user = user;
        req.user.ShoppingSession = await shoppingSessionModel.findOne({user: req.user._id});
        next();
    }

    static async restrictTo(...roles) {
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                return next(new AppError('bạn không có quyền truy cập vào đường dẫn này', 401));
            }
        }
    }

    static async forgotPassword(req, next) {
        if (!req.email) {
            return next(new AppError('Bạn chưa nhập email!', 401));
        }

        const user = await userModel.findOne({email: req.email});
        if (!user) {
            return next(new AppError('email bạn nhập không tồn tại trong hệ thống, vui lòng đăng nhập lại'))
        }

        const token = user.createToken();
        await user.save({validateBeforeSave: false});

        const mailObject = new sendMail();
        const subject = "đã gửi về email, vui lòng reset mật khẩu trong vòng 10 phút";
        const message = `http://localhost:3000/api/v1/users/resetPassword/${token}`;
        console.log(message);
        const info = await mailObject.sendMail(req.email, subject, message);

        if (!info) {
            return next(new AppError('gửi mail không thành công, vui lòng thao tác lại', 401));
        }
        return info;
    }

    static async resetPassword(req, token, res, next) {
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        const user = await userModel.findOne({passwordResetToken: hashedToken});
        if (!user) {
            return next(new AppError('không phải bạn đang reset password!!!', 401));
        }

        if (user.checkInvalidPassword() == false) {
            return next(new AppError('đã hết hạn chờ reset password, vui lòng gửi lại email yêu cầu mật khẩu mới vào email của bạn!!!', 401));
        }

        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        this.createToken(user, res, 200);
        return user;
    }

    static async updateStatusUserOnlineOrOffLine(req, next) {
        const userStatus = await userStatusModel.findOneAndUpdate({userId: req.body.id}, {status: req.body.status}, {upsert: true});
        if (!userStatus) {
            return next(new AppError('không thể cập nhật thông tin user', 401));
        }

        return userStatus;
    }
}
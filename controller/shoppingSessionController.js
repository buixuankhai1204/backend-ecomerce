const shoppingSessionModel = require('../model/shoppingSessionModel');
const factoryApi = require('../utils/factoryApiService');

module.exports = class shoppingSession {
    static async createShoppingSession(req, res, next) {
        const shoppingSession = await factoryApi.createDocument(shoppingSessionModel, req.body, next);

        if(shoppingSession) {
            res.status(200).json({
                status: 'success',
                data: shoppingSession,
                message: 'tạo mới mã giảm phiên mua hàng thành công',
            })
        }
    }

    static async updateShoppingSession(req, res, next) {
        const shoppingSession = await factoryApi.updateDocument(shoppingSessionModel, req.body, next, req.body.id);

        if(shoppingSession) {
            res.status(200).json({
                status: 'success',
                data: shoppingSession,
                message: 'cập nhật mã giảm phiên mua hàng thành công',
            })
        }
    }

    static async deleteShoppingSession(req, res, next) {
        const shoppingSession = await factoryApi.deleteDocument(shoppingSessionModel, next, req.body.id);

        if(shoppingSession) {
            res.status(200).json({
                status: 'success',
                data: shoppingSession,
                message: 'xóa mã giảm phiên mua hàng thành công',
            })
        }
    }

    static async getShoppingSession(req, res, next) {
        const shoppingSession = await factoryApi.getOneDocument(shoppingSessionModel, next, req.body.id, null);

        if(shoppingSession) {
            res.status(200).json({
                status: 'success',
                data: shoppingSession,
                message: 'tạo mới mã giảm phiên mua hàng thành công',
            })
        }
    }

    static async getAllShoppingSession(req, res, next) {
        const shoppingSession = await factoryApi.createDocument(shoppingSessionModel, req.body, next);

        if(shoppingSession) {
            res.status(200).json({
                status: 'success',
                data: shoppingSession,
                message: 'tạo mới mã giảm phiên mua hàng thành công',
            })
        }
    }
}
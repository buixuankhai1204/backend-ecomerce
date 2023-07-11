const cartItemController = require('../model/cartItemModel');
const factoryApi = require('../utils/factoryApiService');

module.exports = class cartItem {
    static async createCartItem(req, res, next) {
        const cartItem = await factoryApi.createDocument(cartItemController, req.body, next);

        if(cartItem) {
            res.status(200).json({
                status: 'success',
                data: cartItem,
                message: 'tạo mới sản phẩm trong giỏ hàng thành công',
            })
        }
    }

    static async updateCartItem(req, res, next) {
        const cartItem = await factoryApi.updateDocument(cartItemController, req.body, next, req.body.id);

        if(cartItem) {
            res.status(200).json({
                status: 'success',
                data: cartItem,
                message: 'cập nhật sản phẩm trong giỏ hàng thành công',
            })
        }
    }

    static async deleteCartItem(req, res, next) {
        const cartItem = await factoryApi.deleteDocument(cartItemController, next, req.body.id);

        if(cartItem) {
            res.status(200).json({
                status: 'success',
                data: cartItem,
                message: 'xóa sản phẩm trong giỏ hàng thành công',
            })
        }
    }

    static async getCartItem(req, res, next) {
        const cartItem = await factoryApi.getOneDocument(cartItemController, next, req.body.id, null);

        if(cartItem) {
            res.status(200).json({
                status: 'success',
                data: cartItem,
                message: 'tạo mới sản phẩm trong giỏ hàng thành công',
            })
        }
    }

    static async getAllCartItem(req, res, next) {
        const cartItem = await factoryApi.createDocument(cartItemController, req.body, next);

        if(cartItem) {
            res.status(200).json({
                status: 'success',
                data: cartItem,
                message: 'tạo mới sản phẩm trong giỏ hàng thành công',
            })
        }
    }
}
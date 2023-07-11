const orderItemController = require('../model/orderItemModel');
const factoryApi = require('../utils/factoryApiService');

module.exports = class orderItem {
    static async createOrderItem(req, res, next) {
        const orderItem = await factoryApi.createDocument(orderItemController, req.body, next);

        if(orderItem) {
            res.status(200).json({
                status: 'success',
                data: orderItem,
                message: 'tạo mới sản phẩm trong đơn hàng thành công',
            })
        }
    }

    static async updateOrderItem(req, res, next) {
        const orderItem = await factoryApi.updateDocument(orderItemController, req.body, next, req.body.id);

        if(orderItem) {
            res.status(200).json({
                status: 'success',
                data: orderItem,
                message: 'cập nhật sản phẩm trong đơn hàng thành công',
            })
        }
    }

    static async deleteOrderItem(req, res, next) {
        const orderItem = await factoryApi.deleteDocument(orderItemController, next, req.body.id);

        if(orderItem) {
            res.status(200).json({
                status: 'success',
                data: orderItem,
                message: 'xóa sản phẩm trong đơn hàng thành công',
            })
        }
    }

    static async getOrderItem(req, res, next) {
        const orderItem = await factoryApi.getOneDocument(orderItemController, next, req.body.id, null);

        if(orderItem) {
            res.status(200).json({
                status: 'success',
                data: orderItem,
                message: 'tạo mới sản phẩm trong đơn hàng thành công',
            })
        }
    }

    static async getAllOrderItem(req, res, next) {
        const orderItem = await factoryApi.createDocument(orderItemController, req.body, next);

        if(orderItem) {
            res.status(200).json({
                status: 'success',
                data: orderItem,
                message: 'tạo mới sản phẩm trong đơn hàng thành công',
            })
        }
    }
}
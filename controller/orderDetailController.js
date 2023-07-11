const orderDetailModel = require('../model/orderDetailModel');
const factoryApi = require('../utils/factoryApiService');

module.exports = class orderDetail {
    static async createOrderDetail(req, res, next) {
        const orderDetail = await factoryApi.createDocument(orderDetailModel, req.body, next);

        if(orderDetail) {
            res.status(200).json({
                status: 'success',
                data: orderDetail,
                message: 'tạo mới chi tiết đơn hàng thành công',
            })
        }
    }

    static async updateOrderDetail(req, res, next) {
        const orderDetail = await factoryApi.updateDocument(orderDetailModel, req.body, next, req.body.id);

        if(orderDetail) {
            res.status(200).json({
                status: 'success',
                data: orderDetail,
                message: 'cập nhật chi tiết đơn hàng thành công',
            })
        }
    }

    static async deleteOrderDetail(req, res, next) {
        const orderDetail = await factoryApi.deleteDocument(orderDetailModel, next, req.body.id);

        if(orderDetail) {
            res.status(200).json({
                status: 'success',
                data: orderDetail,
                message: 'xóa chi tiết đơn hàng thành công',
            })
        }
    }

    static async getOrderDetail(req, res, next) {
        const orderDetail = await factoryApi.getOneDocument(orderDetailModel, next, req.body.id, null);

        if(orderDetail) {
            res.status(200).json({
                status: 'success',
                data: orderDetail,
                message: 'tạo mới chi tiết đơn hàng thành công',
            })
        }
    }

    static async getAllOrderDetail(req, res, next) {
        const orderDetail = await factoryApi.createDocument(orderDetailModel, req.body, next);

        if(orderDetail) {
            res.status(200).json({
                status: 'success',
                data: orderDetail,
                message: 'tạo mới chi tiết đơn hàng thành công',
            })
        }
    }
}
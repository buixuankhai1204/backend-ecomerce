const paymentDetailModel = require('../model/paymentDetailModel');
const factoryApi = require('../utils/factoryApiService');

module.exports = class paymentDetail {
    static async createPaymentDetail(req, res, next) {
        const paymentDetail = await factoryApi.createDocument(paymentDetailModel, req.body, next);

        if(paymentDetail) {
            res.status(200).json({
                status: 'success',
                data: paymentDetail,
                message: 'tạo mới chi tiết thanh toán thành công',
            })
        }
    }

    static async updatePaymentDetail(req, res, next) {
        const paymentDetail = await factoryApi.updateDocument(paymentDetailModel, req.body, next, req.body.id);

        if(paymentDetail) {
            res.status(200).json({
                status: 'success',
                data: paymentDetail,
                message: 'cập nhật chi tiết thanh toán thành công',
            })
        }
    }

    static async deletePaymentDetail(req, res, next) {
        const paymentDetail = await factoryApi.deleteDocument(paymentDetailModel, next, req.body.id);

        if(paymentDetail) {
            res.status(200).json({
                status: 'success',
                data: paymentDetail,
                message: 'xóa chi tiết thanh toán thành công',
            })
        }
    }

    static async getPaymentDetail(req, res, next) {
        const paymentDetail = await factoryApi.getOneDocument(paymentDetailModel, next, req.body.id, null);

        if(paymentDetail) {
            res.status(200).json({
                status: 'success',
                data: paymentDetail,
                message: 'tạo mới chi tiết thanh toán thành công',
            })
        }
    }

    static async getAllPaymentDetail(req, res, next) {
        const paymentDetail = await factoryApi.createDocument(paymentDetailModel, req.body, next);

        if(paymentDetail) {
            res.status(200).json({
                status: 'success',
                data: paymentDetail,
                message: 'tạo mới chi tiết thanh toán thành công',
            })
        }
    }
}
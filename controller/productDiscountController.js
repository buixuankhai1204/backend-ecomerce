const productDiscountModel = require('../model/productDiscountModel');
const factoryApi = require('../utils/factoryApiService');

module.exports = class productDiscount {
    static async createProductDiscount(req, res, next) {
        const productDiscount = await factoryApi.createDocument(productDiscountModel, req.body, next);

        if(productDiscount) {
            res.status(200).json({
                status: 'success',
                data: productDiscount,
                message: 'tạo mới mã giảm sản phẩm thành công',
            })
        }
    }

    static async updateProductDiscount(req, res, next) {
        const productDiscount = await factoryApi.updateDocument(productDiscountModel, req.body, next, req.body.id);

        if(productDiscount) {
            res.status(200).json({
                status: 'success',
                data: productDiscount,
                message: 'cập nhật mã giảm sản phẩm thành công',
            })
        }
    }

    static async deleteProductDiscount(req, res, next) {
        const productDiscount = await factoryApi.deleteDocument(productDiscountModel, next, req.body.id);

        if(productDiscount) {
            res.status(200).json({
                status: 'success',
                data: productDiscount,
                message: 'xóa mã giảm sản phẩm thành công',
            })
        }
    }

    static async getProductDiscount(req, res, next) {
        const productDiscount = await factoryApi.getOneDocument(productDiscountModel, next, req.body.id, null);

        if(productDiscount) {
            res.status(200).json({
                status: 'success',
                data: productDiscount,
                message: 'tạo mới mã giảm sản phẩm thành công',
            })
        }
    }

    static async getAllProductDiscount(req, res, next) {
        const productDiscount = await factoryApi.createDocument(productDiscountModel, req.body, next);

        if(productDiscount) {
            res.status(200).json({
                status: 'success',
                data: productDiscount,
                message: 'tạo mới mã giảm sản phẩm thành công',
            })
        }
    }
}
const productCategoryModel = require('../model/productCategoryModel');
const factoryApi = require('../utils/factoryApiService');

module.exports = class productCategory {
    static async createProductCategory(req, res, next) {
        const productCategory = await factoryApi.createDocument(productCategoryModel, req.body, next);

        if(productCategory) {
            res.status(200).json({
                status: 'success',
                data: productCategory,
                message: 'tạo mới danh mục sản phẩm thành công',
            })
        }
    }

    static async updateProductCategory(req, res, next) {
        const productCategory = await factoryApi.updateDocument(productCategoryModel, req.body, next, req.body.id);

        if(productCategory) {
            res.status(200).json({
                status: 'success',
                data: productCategory,
                message: 'cập nhật danh mục sản phẩm thành công',
            })
        }
    }

    static async deleteProductCategory(req, res, next) {
        const productCategory = await factoryApi.deleteDocument(productCategoryModel, next, req.body.id);

        if(productCategory) {
            res.status(200).json({
                status: 'success',
                data: productCategory,
                message: 'xóa danh mục sản phẩm thành công',
            })
        }
    }

    static async getProductCategory(req, res, next) {
        const productCategory = await factoryApi.getOneDocument(productCategoryModel, next, req.body.id, null);

        if(productCategory) {
            res.status(200).json({
                status: 'success',
                data: productCategory,
                message: 'tạo mới danh mục sản phẩm thành công',
            })
        }
    }

    static async getAllProductCategory(req, res, next) {
        const productCategory = await factoryApi.createDocument(productCategoryModel, req.body, next);

        if(productCategory) {
            res.status(200).json({
                status: 'success',
                data: productCategory,
                message: 'tạo mới danh mục sản phẩm thành công',
            })
        }
    }
}
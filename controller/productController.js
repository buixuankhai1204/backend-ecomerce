const productModel = require('../model/productModel');
const factoryApi = require('../utils/factoryApiService');
const crypto = require("crypto");

module.exports = class product {
    static async createProduct(req, res, next) {
        const product = await factoryApi.createDocument(productModel, req.body, next);

        if (product) {
            res.status(200).json({
                status: 'success',
                data: product,
                message: 'tạo mới sản phẩm thành công',
            })
        }
    }

    static async updateProduct(req, res, next) {
        const product = await factoryApi.updateDocument(productModel, req.body, next, req.body.id);

        if (product) {
            res.status(200).json({
                status: 'success',
                data: product,
                message: 'cập nhật sản phẩm thành công',
            })
        }
    }

    static async deleteProduct(req, res, next) {
        const product = await factoryApi.deleteDocument(productModel, next, req.body.id);

        if (product) {
            res.status(200).json({
                status: 'success',
                data: product,
                message: 'xóa sản phẩm thành công',
            })
        }
    }

    static async getProduct(req, res, next) {
        const product = await factoryApi.getOneDocument(productModel, next, req.body.id, null);

        if (product) {
            res.status(200).json({
                status: 'success',
                data: product,
                message: 'tạo mới sản phẩm thành công',
            })
        }
    }

    static async getAllProduct(req, res, next) {
        const product = await factoryApi.getAllDocument(req, next, productModel);

        res.status(200).json({
            status: 'success',
            data: product,
            message: 'tạo mới sản phẩm thành công',
        })
    }

    static async addDataTest(req, res, next) {
        const randomString = crypto.randomBytes(64).toString('hex');
        let isStop = false;
        for (let i = 0; i <= 10000000000000; i++) {
            console.log(`i:  ${i}`);
            const product = await productModel.create({
                name: crypto.randomBytes(64).toString('hex'),
                title: crypto.randomBytes(64).toString('hex'),
                user: "649e7fd12d0b181e14ef7e19",
                description: crypto.randomBytes(64).toString('hex'),
                price: crypto.randomInt(32),
            });
        }

        if (isStop) {
            res.status(200).json({
                status: 'success',
                message: 'tạo mới sản phẩm thành công',
            })
        }

    }
}
const productModel = require('../../model/productModel');
const factoryApi = require('../../utils/factoryApiService');
const AppError = require('../../utils/appError');
module.exports = class productService {
    static async createProduct(req, next) {
        const product = await factoryApi.createDocument(productModel, req.body, next);
        if (!product) {
            return next(new AppError('tạo mới sản phẩm không thành công', 401));
        }
        return product;
    }
    //
    static async getProductById(req, next){
        const product = await factoryApi.getOneDocument(productModel, next, req.body.id);
        if (!product) {
            return next(new AppError('lấy sản phẩm không thành công', 401));
        }
        return product;
    }

    static async getAllProduct(req, next) {
        const product = await factoryApi.getAllDocument(req, next, productModel);
        if(!product) {
            return next(new AppError('lấy danh sách sản phẩm thất bại', 401));
        }
        return product;
    }
}
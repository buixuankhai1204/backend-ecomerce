const productModel = require('../../model/productModel');
const factoryApi = require('../../utils/factoryApiService');
const AppError = require('../../utils/appError');
const productScoreModel = require("../../model/productScore");
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

    static async getProductByNameAndDecription(req, next) {

    }

    static async updateProductScore(req, res, next) {
        const options = {
            upsert: true, // Create the document if it doesn't exist
            new: true,    // Return the updated document after the update
            setDefaultsOnInsert: true, // Apply default values during insertion
        };
        const updateOperations = {
            $set: {
                "productScore._id": req.params.id
            },
            $setOnInsert: {
                "productScore._id": req.params.id,
            },
            $inc: { 'score': 1 },
        };
        const productScoreUpdate = await productScoreModel.findOneAndUpdate(
            {
                _id: req.params.id
            },
            updateOperations,
            options
        );

        next();
    }
}
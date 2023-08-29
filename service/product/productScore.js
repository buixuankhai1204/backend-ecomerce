const factoryApi = require("../../utils/factoryApiService");
const productModel = require("../../model/productScore");
const AppError = require("../../utils/appError");
const redis = require("../../redis/redis");
const productScoreModel = require("../../model/productScore");

module.exports = class productScore {
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
            $inc: {'score': 1},
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

    static async getTopscore() {
        const productTopScore = await productScoreModel.aggregate([
            {
                $sort: {"score": -1},
            },
            {
                $limit: 10
            }
        ]);
        let result = [];
        for (const resultElement of productTopScore) {
            const product = {score: resultElement.score, value: resultElement._id};
            result.push(product);
        }
        if (!productTopScore) {
            return next(new AppError('lấy danh sách sản phẩm thất bại', 401));
        }
        return result;
    }

}
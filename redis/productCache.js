const redis = require("./redis");
var cron = require('node-cron');
const productModel = require("../model/productModel");
const productScoreService = require("../service/product/productScore");

module.exports = class productCache {
    static async productIdCacheData(req, res, next) {
        const redisKey = `productId:${req.params.id}`;
        const cachedResult = await redis.get(redisKey);
        if (!cachedResult) {
            next();
        } else {
            res.status(200).json({
                status: 'success',
                data: JSON.parse(cachedResult),
                message: "lay san pham thanh cong"
            })
        }
    }

    static async setTop10ScoreProduct(req, res, next) {
        const listproductId = await productScoreService.getTopscore();
        redis.zAdd("productTopView", listproductId);

        //because we warm up top View each 12h, so we create a list info product by type string
        //step 2
        let infoListProductValue = [];
        for (let i = 0; i < listproductId.length; i++) {
            console.log(listproductId[i]);
            const product = await redis.get(`productId:${listproductId[i]["value"]}`);
            infoListProductValue.push(JSON.parse(product));
        }

        //step 3
        await redis.set("productTopViewFull", JSON.stringify(infoListProductValue));

        res.status(200).json({
            status: 'success',
            data: infoListProductValue,
            message: "lay danh sach san pham thanh cong"
        })
    }

    static async getTopScoreProduct(req, res, next) {
        const redisKey = "productTopViewFull";
        const products = JSON.parse(await redis.get(redisKey));
        if (!products) {
            return next();
        }

        let result = [];
        if (req.query) {
            for (let i = 0; i < products.length; i++) {
                if (products["category"] === req.query.category) {
                    result.push(products[i]);
                }
            }
        }

        res.status(200).json({
            status: 'success',
            data: result,
            message: "lay danh sach san pham thanh cong"
        })
    }

    static async cacheTopProductViewscheduler(value) {
        var task = cron.schedule('0 0 */1 * * *', async () => {
            const listproductId = await productScoreService.getTopscore();
            redis.zAdd("productTopView", listproductId);
            let infoListProductValue = [];
            for (let i = 0; i < listproductId.length; i++) {
                console.log(listproductId[i]);
                const product = await redis.get(`productId:${listproductId[i]["value"]}`);
                infoListProductValue.push(JSON.parse(product));
            }

            await redis.set("productTopViewFull", JSON.stringify(infoListProductValue));
        });

        task.start();
    }
}

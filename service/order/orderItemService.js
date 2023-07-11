const factoryApi = require("../../utils/factoryApiService");
const productModel = require("../../model/productModel");
const orderItemModel = require("../../model/orderItemModel");
const AppError = require("../../utils/appError");
module.exports = class orderItemService {
    static async addItemToOrder(req, next) {
        const orderItem = await orderItemModel.create({
            order: req.body.order_id,
            product: product._id,
            quantity: req.body.quantity
        })

        if (!orderItem) {
            return next(new AppError('không thể thêm sản phẩm mới vào giỏ hàng', 401));
        }

        return orderItem;
    }

    static async removeItemFromOrder(req, next) {
        const orderItem = await orderItemModel.findOneAndDelete({product: req.body.product_id, order: req.body.order_id}).lean();
        if (!orderItem) {
            return next(new AppError('không thể xóa sản phẩm khỏi giỏ hàng', 401));
        }

        return orderItem;
    }
}
const cartItemModel = require('../../model/cartItemModel');
const productModel = require('../../model/productModel');
const shoppingSesionService = require('../cart/shoppingSessionService');
const AppError = require("../../utils/appError");
module.exports = class cartItemService {

    static async addItemToCart(req, next) {
        let cartItem = await cartItemModel.findone({product: req.body.product_id, shoppingSession: req.user.shoppingSession._id});
        if (cartItem) {
            cartItem.quantity = req.body.quantity
        } else {
            cartItem = await cartItem.create({
                user: req.body.userId,
                quantity: 1,
                product: req.body.product_id,
                shopingSession: req.user.shopingSession._id
            })

            if (!cartItem) {
                return next(new AppError('không thể thêm sản phẩm mới vào giỏ hàng', 401));
            }
        }
        await shoppingSesionService.updateTotalCart(req, req.body.product_price * cartItem.quantity);

        return cartItem;
    }

    static async removeItemFromCart(req,next) {
        const cartItem = await cartItemModel.findOneAndDelete({product: req.body.product_id, shoppingSession: req.user.shoppingSession._id}).lean();
        if (!cartItem) {
            return next(new AppError('không thể thêm sản phẩm với ID này giỏ hàng của người dùng', 401));
        }
        await shoppingSesionService.updateTotalCart(req, -req.body.product_price * cartItem.quantity);
        return cartItem;
    }

    static async selectItemToCheckout(req, next) {
        const cartItem = await cartItemModel.findOneAndUpdate({product: req.body.product_id, shoppingSession: req.user.shoppingSession._id},{isSelect: req.body.isSelect}).lean();
        if (!cartItem) {
            return next(new AppError('không thể cập nhật sản phẩm với ID này giỏ hàng của người dùng', 401));
        }

        return cartItem;
    }

    static async deleteAllItemFromCart(req, next, shoppingSessionId) {
        const cartItem = await cartItemModel.findOneAndDelete({shoppingSession: req.user.shoppingSession._id}).lean();
        if (!cartItem) {
            return next(new AppError('không thể tìm tất cả sản phẩm với ID này giỏ hàng của người dùng', 401));
        }
        return cartItem;
    }
}
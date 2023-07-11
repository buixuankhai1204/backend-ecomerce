const shoppingSessionModel = require('../../model/shoppingSessionModel');
const cartItemService = require('../cart/cartItemService');
const AppError = require("../../utils/appError");
module.exports = class shoppingSessionService {

    static async createCart(req, next) {
        const shoppingSession = await shoppingSessionModel.findById(req.body.id);
        if(shoppingSession) {
            return next (new AppError('user đã tạo giỏ hàng', 401));
        }

        const newShoppingSession = await shoppingSession.create({
            user: req.body.userId,
            total: 0
        });

        return newShoppingSession;
    }

    static async deleteAllItemfromCart(req, next) {
        const cartItems = await cartItemService.deleteAllItemFromCart(req,next, req.user.shoppingSession._id);
        req.user.shoppingSession.total = 0;
        return cartItems;
    }

    static async updateTotalCart(req, valueChange) {
        req.user.shoppingSession.total += valueChange;
        await req.user.shoppingSession.save({validateBeforeSave: false});
    }
}
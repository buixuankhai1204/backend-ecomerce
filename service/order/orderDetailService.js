const orderDetailModel = require('../../model/orderDetailModel');
const cartItemService = require('../cart/cartItemService');
const factoryApi = require('../../utils/factoryApiService');
const AppError = require("../../utils/appError");
module.exports = class orderDetailService {
    static async createOrder(req, next) {
        const newOrderDetail = await orderDetailModel.create({
            user: req.body.user_id,
            payment: req.body.payment_id,
            total: req.body.total
        });

        if(!newOrderDetail) {
            return next( new AppError('không tạo được đơn hàng mới!', 401));
        }
        return newOrderDetail;
    }

    static async deleteOrder(req, next) {
        const order = await factoryApi.deleteDocument(orderDetailModel,next, req.body._id);
        if(!order) {
            return next( new AppError('không xóa được đơn hàng với id này!', 401));
        }

        return order;
    }

    static async updateTotalCart(req, valueChange) {
        req.user.orderDetail.total += valueChange;
        await req.user.orderDetail.save({validateBeforeSave: false});
    }
}
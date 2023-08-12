const chatModel = require('../../model/messageModel');
const cartItemService = require('../cart/cartItemService');
const factoryApi = require('../../utils/factoryApiService');
const AppError = require("../../utils/appError");
module.exports = class chatService {
    static async createMessageChat(req, next) {
        req.body.messageFrom = req.user._id;
        req.body.messageTo = req.params.id;
        const message = await factoryApi.createDocument(chatModel,req.body, next);

        if(!message) {
            return next( new AppError('không tạo được đơn hàng mới!', 401));
        }
        return message;
    }
}
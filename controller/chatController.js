const messageModel = require('../model/messageModel');
const chatService = require('../service/chat/chatService');
const redis = require("../redis/redis");
module.exports = class Chat {
    static async createMessageChat(req, res, next) {
        const message = await chatService.createMessageChat(req, next);
        req.message = message;
        next();
        // if (message) {
        //         res.status(200).json({
        //             status: 'success',
        //             data: message,
        //             message: 'tạo mới sản phẩm thành công',
        //         })
        //     }
        // }
    }
}
const messageModel = require('../model/messageModel');
const chatService = require('../service/chat/chatService');
const redis = require("../redis/redis");
module.exports = class Chat {
    static async createMessageChat(channelId, userFrom, content) {
        const message = await chatService.createMessageChat(channelId, userFrom, content);
        if (message) {
            res.status(200).json({
                status: 'success',
                data: message,
                message: 'tạo mới sản phẩm thành công',
            })
        }
    }

    static async createChannel(req, res, next) {
        const channelId = await chatService.createChannel(req, next);
        console.log(channelId);
        if (channelId) {
            res.status(200).json({
                status: 'success',
                data: channelId,
                message: 'tạo mới channel thành công',
            })
        }
    }

static async getAllChannelByUserId(req, res, next) {
        const channels = await chatService.getAllChannelByUserId(req, next);

        if (channels) {
            res.status(200).json({
                status: 'success',
                data: channels,
                message: 'lấy danh sách tin nhắn thành công',
            })
        }
    }

    static async getAllMessageByChannelId(req,res,next) {
        const messages = await chatService.getAllMessageByChannelId(req,next);

        if (messages) {
            res.status(200).json({
                status: 'success',
                data: messages,
                message: 'lấy danh sách tin nhắn của một user thành công',
            })
        }
    }
}

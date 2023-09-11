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

    static async createChannelGroup(req, res, next) {
        const channelGroup = await chatService.createChannelGroup(req, next);

        if (channelGroup) {
            res.status(200).json({
                status: 'success',
                data: channelGroup,
                message: 'tạo group thành công!',
            })
        }
    }

    static async addMemberToGroup(req, res, next) {
        const channelUpdate = await chatService.addMemberToGroup(req.body.channelId, req.body.userId, next);

        if (channelUpdate) {
            res.status(200).json({
                status: 'success',
                data: channelUpdate,
                message: 'thêm mới thành viên thành công!'
            })
        }
    }

    static async sendFile(req, res, next) {
        console.log(req.file);
        // const channelUpdate = await chatService.sendFile(req.body.channelId, req.body.userId, req.body.file);
        //d983e26858455c7a6858ca90c4c8803b
        // if (channelUpdate) {
        //     res.status(200).json({
        //         status: 'success',
        //         data: channelUpdate,
        //         message: 'thêm mới thành viên thành công!'
        //     })
        // }
    }

}

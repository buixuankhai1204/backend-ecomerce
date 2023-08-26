const messageModel = require('../../model/messageModel');
const channelModel = require('../../model/channelModel');
const userModel = require('../../model/userModel');
const AppError = require("../../utils/appError");
const messageCache = require("../../redis/chat/messageCache");
const mongoose = require('mongoose');

module.exports = class chatService {
    static async createMessageChat(channelId, userFrom, content) {
        let data = {};
        data.channelId = mongoose.Types.ObjectId(channelId);
        data.messageFrom = mongoose.Types.ObjectId(userFrom);
        data.content = content;
        const message = await messageModel.create(data);
        if (!message) {
            return new AppError('không chưa thể gửi tin nhắn mới', 401);
        }

        await messageCache.messageIdSetCache(data.messageFrom, message);
        return message;
    }

    static async createChannel(req, next) {
        let data = [mongoose.Types.ObjectId(req.body.userFrom), mongoose.Types.ObjectId(req.body.userTo)];
        const channel = await channelModel.create({userIds: data})

        if (!channel) {
            return next(new AppError('khong tao duoc channel mowi', 401));
        }
        return channel;
    }

    static async getAllChannelByUserId(req, next) {
        let channels = await channelModel.aggregate([{$match: { userIds: mongoose.Types.ObjectId(req.params.id)}},
        ]);
        console.log(channels);
        if (!channels) {
            return next(new AppError('khong tao duoc channel mowi', 401));
        }

        for (let i = 0; i < channels.length; i++) {
            let userId = "";
            if (req.user._id === channels[i].userIds[0].toString()) {
                userId = channels[i].userIds[1].toString();
            } else {
                userId = channels[i].userIds[0].toString();
            }

            let userInfo = await userModel.findById(userId);
            if (!userInfo) {
                return next(new AppError('khong tim thay user bang userInfo', 401));
            }
            channels[i].name = userInfo.name;
            channels[i].userId = userInfo._id.toString();
        }
        return channels;
    }

    static async getAllMessageByChannelId(req, next) {
        let list100MessagesCache = await messageCache.getListMessagesCacheByChannelId(req.params.channelId);
        console.log(list100MessagesCache);
        if(list100MessagesCache.length === 0) {
            let messages;
            messages = await messageModel.find({channelId: req.params.channelId});
            if (!messages) {
                return next(new AppError('không thể lấy danh sách tin nhắn', 401));
            }
            console.log(messages);
            for (let i = 0; i < messages.length; i++) {
                console.log(messages[i]);
                await messageCache.cacheMessageToListMessageByMessageId(messages[i].channelId, messages[i]._id,messages[i]);
            }
            return messages;
        }
        return list100MessagesCache;

    }


}
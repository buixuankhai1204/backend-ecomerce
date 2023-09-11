const messageModel = require('../../model/messageModel');
const channelModel = require('../../model/channelModel');
const userModel = require('../../model/userModel');
const AppError = require("../../utils/appError");
const messageCache = require("../../redis/chat/messageCache");
const mongoose = require('mongoose');
const multer  = require('multer')
const upload = multer({ dest: '../public' })


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
        let channels = await channelModel.aggregate([{$match: {userIds: mongoose.Types.ObjectId(req.params.id)}},
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
            if (channels[i].type == 0) {
                channels[i].name = userInfo.name;
            } else {
                channels[i].name = channels[i].nameChannel;
            }
        }
        return channels;
    }

    static async getAllMessageByChannelId(req, next) {
        let list100MessagesCache = await messageCache.getListMessagesCacheByChannelId(req.params.channelId);
        console.log(list100MessagesCache);
        if (list100MessagesCache.length === 0) {
            let messages;
            messages = await messageModel.find({channelId: req.params.channelId});
            if (!messages) {
                return next(new AppError('không thể lấy danh sách tin nhắn', 401));
            }
            console.log(messages);
            for (let i = 0; i < messages.length; i++) {
                console.log(messages[i]);
                await messageCache.cacheMessageToListMessageByMessageId(messages[i].channelId, messages[i]._id, messages[i]);
            }
            return messages;
        }
        return list100MessagesCache;

    }

    static async createChannelGroup(req, next) {
        let userIdsObj = [];
        let typeChannel = 1;
        // 0: chat 1:1, 1: chat group
        for (let i = 0; i < req.body.usersIds.length; i++) {
            userIdsObj.push(mongoose.Types.ObjectId(req.body.userIds[i]));
        }

        let channelGroup = await channelModel.create({
            userIds: userIdsObj,
            type: typeChannel,
            nameChannel: req.body.nameChannel,
            idRoomOwner: req.user._id,
            adminIds: [req.user._id]
        },);
        if (!channelGroup) {
            return next(new AppError('không tạo được channel group mới!', 401));
        }
        return channelGroup;
    }

    ststic

    async addMemberToGroup(channelId, userId, next) {
        let channel = await channelModel.findById(channelId);
        if(!channel) {
            return next(new AppError('không tìm thấy channel', 401));
        }

        let userIds = channel.userIds;
        let isConstrains = userIds.constrain(userIds);
        if(isConstrains === true) {
            return next( new AppError('thành viên đã được thêm vào nhóm trứớc đó, vui lòng kiểm tra lại', 401));
        }

        userIds.push(userId);

        let channelUpdate = await channelModel.findByIdAndUpdate(channelId, {userIds: userIds});

        if(!channelUpdate) {
            return next(new AppError('không thể thêm thành viên mới!!', 401));
        }

        return channelUpdate;
    }

    static async sendFile(channelId, usserId, file) {
        console.log(file);
        name = `${channelId}-${userId}-${file.name}`;
        writeFile(`/file/${name}.img`, file, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }

}
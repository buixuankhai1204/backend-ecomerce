const redis = require("../redis");
var cron = require('node-cron');
const messageModel = require("../../model/messageModel");
const chatServiceService = require("../../service/chat/chatService");
module.exports = class messageCache {
    static async messageIdCacheData(req, res, next) {
        const redisKey = `messageId:${req.body.content}`;
        const cachedResult = await redis.get(redisKey);
        if (!cachedResult) {
            next();
        } else {
            res.status(200).json({
                status: 'success',
                data: JSON.parse(cachedResult),
                message: "lay san pham thanh cong"
            })
        }
    }

    static async messageIdSetCache(req, res, next) {
        const redisKey = `messageId:${req.message._id}`;
        const cachedResult = await redis.set(redisKey, req.body.content);
        next();
    }

    static async messageListCache(req, res, next) {
        let rediskey = `messageFrom:messageTo:${req.user._id}:${req.params.messageTo}`;
        let len = await redis.LLEN(rediskey);
        if (len == 0) {
            rediskey = `messageFrom:messageTo:${req.body.messageTo}:${req.user._id}`;
        }
        //req.body.content is set in pre middleware
        await redis.LPUSH(rediskey, req.body.content);
        len = await redis.LLEN(rediskey);
        if(len > 100) {
            await redis.RPOP(rediskey);
        }
        next();

    }
}

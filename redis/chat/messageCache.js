const redis = require("../redis");

module.exports = class messageCache {
    static async messageIdCacheData(req, res, next) {
        const redisKey = `messageId:${req.body.content}`;
        const cachedResult = await redis.get(redisKey);
        if (!cachedResult) {
            return null;
        } else {
            return JSON.parse(cachedResult);
        }
    }

    static async messageIdSetCache(messageFrom, messageDocument) {
        const redisKey = `messageId:${messageFrom}`;
        const cachedResult = await redis.set(redisKey, JSON.stringify(messageDocument));
        if (cachedResult) {
            return cachedResult;
        } else {
            return null;
        }
    }

    static async cacheMessageToListMessageByMessageId(channelId, messageId, document) {
        let rediskey = `channelId:${channelId}`;
        let messageInsert = `messageFrom:document:${messageId}:${JSON.stringify(document)}`
        await redis.LPUSH(rediskey, messageInsert);
        let len = await redis.LLEN(rediskey);
        if (len > 100) {
            await redis.RPOP(rediskey);
        }
    }

    static async getListMessagesCacheByChannelId(channelId) {
        let listMessageResult = [];
        let rediskey = `channelId:${channelId}`;
        console.log(rediskey);
        let listMessages = await redis.LRANGE(rediskey, 0, -1);
        if (!listMessages) {
            return null;
        }
        console.log(`listMessages: ${listMessages[1]}`);
        for (let i = 0; i < listMessages.length; i++) {
            const messagePartIndex = listMessages[i].search('{');
            const messagePart = listMessages[i].slice(messagePartIndex);
            console.log(`messagePart: ${messagePart}`);

            let messageObj = JSON.parse(messagePart);
            listMessageResult.push(messageObj);
        }

        return listMessageResult;
    }
}

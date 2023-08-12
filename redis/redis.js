const redis = require("redis");

let redisClient;
(async () => {
    redisClient = redis.createClient();
    redisClient.on("error", (error) => console.log(`Error: ${error}`));
    redisClient = await redisClient.connect();
    return redisClient;
})();
module.exports = redisClient;
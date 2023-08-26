const express  = require('express');
const authService = require('../service/user/authService');
const catchError = require('../utils/CatchError');
const chatController = require('../controller/chatController');
const messageCache = require('../redis/chat/messageCache');
const kafka = require('../service/messageSyncQueue/kafka');
const router = express.Router();

router.route('/channel/:id').get(
    catchError(authService.protect), catchError(chatController.getAllChannelByUserId),
)
router.route('/channel').post(
    catchError(authService.protect), catchError(chatController.createChannel),
)

router.route('/message/:channelId').get(
    catchError(authService.protect), catchError(chatController.getAllMessageByChannelId),

)


module.exports = router;
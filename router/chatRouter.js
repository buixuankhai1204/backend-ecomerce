const express  = require('express');
const authService = require('../service/user/authService');
const catchError = require('../utils/CatchError');
const chatController = require('../controller/chatController');
const messageCache = require('../redis/chat/messageCache');
const kafka = require('../service/messageSyncQueue/kafka');
const router = express.Router();

router.route('/user/:id').post(catchError(authService.protect),catchError(chatController.createMessageChat), catchError(messageCache.messageIdSetCache),catchError(messageCache.messageListCache), catchError(kafka.sendMessageToQueue));


module.exports = router;
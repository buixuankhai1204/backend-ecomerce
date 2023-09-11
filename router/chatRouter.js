const express  = require('express');
const authService = require('../service/user/authService');
const catchError = require('../utils/CatchError');
const chatController = require('../controller/chatController');
const messageCache = require('../redis/chat/messageCache');
const kafka = require('../service/messageSyncQueue/kafka');
const multer  = require('multer')
const upload = multer({ dest: '../public/' })
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

router.route('/channelGroup').post(
    catchError(authService.protect), catchError(chatController.createChannelGroup),
)

router.route('/addUser').post(
    catchError(authService.protect), catchError(chatController.addMemberToGroup)
)

router.route('/sendFile/').post(
    catchError(authService.protect), upload.single('avatar'), catchError(chatController.sendFile)
)

module.exports = router;
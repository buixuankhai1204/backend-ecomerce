const mongoose = require('mongoose');

const uerStatusSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Channel',
        req: [true, 'tin nhắn phải được liên kết với người gửi']
    },
    //1 : online
    //2 : offline
    status: {
        type: Number,
        req: [true, 'thông tin phải có status online/offline user']
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

const uerStatusModel = mongoose.model('UserStatus', uerStatusSchema);

module.exports = uerStatusModel;

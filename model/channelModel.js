const mongoose = require('mongoose');

const chanelSchema = new mongoose.Schema({

    nameChannel: {
        type: String,
    },
    idRoomOwner: {
        type: [mongoose.Schema.Types.ObjectId],
        req: [true, 'channel phải có người nhận']
    },
    type: {
        type: Number,
        enum: [0, 1, 2, 3],
        default: 0,
        select: false
    },
    userIds: {
        type: [mongoose.Schema.Types.ObjectId],
        req: [true, 'channel phải có người nhận']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

const chanelModel = mongoose.model('Channel', chanelSchema);

module.exports = chanelModel;

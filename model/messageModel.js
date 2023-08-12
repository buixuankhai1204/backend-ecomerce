const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    messageFrom: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        req: [true, 'tin nhắn phải được liên kết với người gửi']
    },
    messageTo: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        req: [true, 'tin nhắn phải được liên kết với người nhận']
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        req: [true, 'sản phẩm phải được liên kết với người tạo sản phẩm']
    }],
    content: {
        type: String,
        req: [true, 'nội dung không được để trống'],
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

messageSchema.pre('save', async function (req, res, next) {

})
const messageModel = mongoose.model('Message', messageSchema);

module.exports = messageModel;

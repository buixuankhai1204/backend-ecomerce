const mongoose = require('mongoose');

const shoppingSessionSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: [true, 'phiên mua hàng phải được liên kết với người dùng']
    },
    total: {
        type: Number,
        required: [true, 'phiên mua hàng phải có tổng thanh toán']
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    modified_at: {
        type: Date,
    },
})
const shoppingSession = mongoose.model('ShoppingSession', shoppingSessionSchema);

module.exports = shoppingSession;

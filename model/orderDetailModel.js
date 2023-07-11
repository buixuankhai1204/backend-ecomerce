const mongoose = require('mongoose');


const orderDetailSchema = new mongoose.Schema({
    order : {
        type: mongoose.Schema.Types.ObjectId, ref: 'Payment',
        required: [true, 'chi tiết thanh toán phải được liên kết với thanh toán']
    },
    user : {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: [true, 'chi tiết thanh toán phải được liên kết với người dùng']
    },
    total: {
        type: Number,
        required: [true, 'chi tiết đơn hàng phải có tổng thanh toán']
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    modified_at: {
        type: Date,
    },
})
const orderDetail = mongoose.model('OrderDetail', orderDetailSchema);

module.exports = orderDetail;

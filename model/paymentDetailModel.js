const mongoose = require('mongoose');


const paymentDetailSchema = new mongoose.Schema({
    order : {
        type: mongoose.Schema.Types.ObjectId, ref: 'Order',
        required: [true, 'chi tiết thanh toán phải được liên kết với đơn hàng']
    },
    amount: {
        type: Number,
        required: true
    },
    provider: {
        type: String,
        required: [true, 'chi tiết thanh toán phải có nhà cung cấp']
    },
    status: {
        type: String,
        enum: ['đang chuẩn bị, đang vận chuyển, đã vận chuyển'],
        default: 'đang chuẩn bị'
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    modified_at: {
        type: Date,
    },
})
const paymentDetail = mongoose.model('PaymentDetail', paymentDetailSchema);

module.exports = paymentDetail;

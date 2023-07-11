const mongoose = require('mongoose');


const orderItemSchema = new mongoose.Schema({
    shoppingSession : {
        type: mongoose.Schema.Types.ObjectId, ref: 'ShoppingSession',
        required: [true, 'sản phẩm đơn hàng phải được liên kết với phiên mua hàng']
    },
    product : {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product',
        required: [true, 'sản phẩm đơn hàng phải được liên kết với sản phẩm']
    },
    quantity: {
        type: Number,
        required: [true, 'sản phẩm đơn hàng phải có số lượng sản phẩm được mua']
    },
    isSelect: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    modified_at: {
        type: Date,
    },
})
const orderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = orderItem;

const mongoose = require('mongoose');

const productInventorySchema = new mongoose.Schema({
    product: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Product',
        required: [true, 'sản phẩm trong kho phải được liên kết với sản phẩm']
    }],
    name: {
        type: String,
        lowercase: true,
        required: [true, 'bạn phải nhập tên cho mã giảm giá'],
    },
    desc: {
        type: String,
        lowercase: true,
        required: [true, 'bạn phải nhập mô tả cho mã giảm giá'],
    },
    percent: {
        type: Number,
        required: [true, 'bạn phải nhập phần trăm giảm giá cho sản phẩm'],
    },
    is_active: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
    },
    deleted_at: {
        type: Date,
    }
});

productInventorySchema.pre('save', async function (req, res, next) {

})
const productInventoryModel = mongoose.model('ProductInventory', productInventorySchema);

module.exports = productInventoryModel;

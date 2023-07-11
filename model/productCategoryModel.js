const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
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
    parentId: {
        type: Number,
        default: 0
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

productCategorySchema.pre('save', async function (req, res, next) {

})
const productCategoryModel = mongoose.model('ProductCategory', productCategorySchema);

module.exports = productCategoryModel;

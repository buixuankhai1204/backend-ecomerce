const mongoose = require('mongoose');

const productInventorySchema = new mongoose.Schema({
    product: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Product',
        required: [true, 'sản phẩm trong kho phải được liên kết với sản phẩm']
    }],
    quantity: {
        type: Number,
        required: [true, 'bạn phải nhập số lượng sản phẩm có trong kho'],
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

const mongoose = require('mongoose');

const userAddressSchema = new mongoose.Schema({
    user: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: [true, 'địa chỉ phải được liên kết với người dùng']
    }],
    address_line1: {
        type: String,
        required: [true, 'Please provide your email'],
        lowercase: true,
    },
    address_line2: {
        type: String,
        lowercase: true,
    },
    city: {
        type: String,
        lowercase: true,
    },
    country: {
        type: String,
        required: [true, 'Bạn phải nhập tên nước'],
        lowercase: true,
    },
    postal_code: {
        type: String,
        lowercase: true,
        required: [true, 'Bạn phải nhập postal code']
    },
    telephone: {
        type: String,
        lowercase: true,
        required: [true, 'Bạn phải nhập số điện thoại']
    },
    isDefault: {
        type: Boolean,
        default: true,
    }
});

userAddressSchema.pre('save', async function (req, res, next) {

})
const userAddressModel = mongoose.model('UserAddress', userAddressSchema);

module.exports = userAddressModel;

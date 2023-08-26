const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Vui lòng nhập tên sản phẩm!'],
        unique: false
    },
    title: {
        type: String,
        required: [true, 'Vui lòng nhập tiêu đề sản phẩm!']
    },
    image: {
        type: String,
        default: 'avatar'
    },

    // category: [{
    //     type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory',
    //     req: [true, 'sản phẩm phải được liên kết với danh mục']
    // }],
    user: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        req: [true, 'sản phẩm phải được liên kết với người tạo sản phẩm']
    }],

    description: {
        type: String,
        required: [true, 'vui lòng nhập nội dung của sản phẩm']
    },
    price: Number,
    color: {
        type: String,
        lowercase: true,
        default: 'red'
    },
    active: {
        type: Number,
        enum: [0, 1, 2, 3],
        default: true,
        select: false
    },

});

productSchema.pre('find', function () {
    this.populate('User').populate('Category').populate('Image');
});

// productSchema.post('save', function(doc, next) {
//     doc.populate('User').populate('Category').populate('Image').then(function() {
//         next();
//     });
// });

const Product = mongoose.model('Product', productSchema);


module.exports = Product;

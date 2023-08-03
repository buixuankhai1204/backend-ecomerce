const mongoose = require('mongoose');

const productScoreSchema = new mongoose.Schema({
    _id: String,
    score: {
        type: Number,
        default: 1,
    }
},{ _id: false });

productScoreSchema.pre('save', async function (req, res, next) {

})
const productScoreModel = mongoose.model('ProductScore', productScoreSchema);

module.exports = productScoreModel;

const AppError = require("./appError");
const apiFeature = require("../utils/APIFeature");
const APIFeatures1 = require("./APIFeature1");
module.exports = class factoryApi {
    static async createDocument(doc, data, next) {
        const document = await doc.create(data);
        if(!document) {
            return next(new AppError('không thể tạo mới document', 401));
        }
        return document
    }

    static async updateDocument(doc, data, next, id) {

        const document = await doc.findByIdAndUpdate({_id: id}, data, {
            runValidators: true,
            new: true
        }).lean();
        if(!document) {
            return next(new AppError('không thể cập nhật document', 401));
        }

        return document
    }

    static async deleteDocument(doc, next, id) {
        const document = await doc.findOneAndDelete({_id: id});
        if(!document) {
            return next(new AppError('không thể xóa document', 401));
        }

        return document
    }

    static async getOneDocument(doc, next, id, popOptions) {
        let document = await doc.findById(id).lean();
        if(popOptions) {
            document = document.populate(popOptions).lean();
        }
        if(!document) {
            return next(new AppError('không có document cần tìm với id này!', 401));
        }

        return document;
    }

    static async getAllDocument(req, next, doc) {
        let features = new apiFeature(doc, req.query).filter().sort().paginate();
        const document = await features.query;

        return document;
    }
}
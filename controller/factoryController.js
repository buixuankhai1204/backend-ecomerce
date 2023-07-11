const AppError = require('../utils/appError');
const factoryApiService = require('../utils/factoryApiService');
module.exports = class factoryController {
    static async createDocument(req, res, next, docModel) {
        const document = await factoryApiService.createDocument(docModel, req.body, next);

        res.status(200).json({
            status: 'success',
            data: document,
            message: 'tạo mới document thành công!'
        })
    }

    static async updateDocument(req, res, next, docModel, condition) {
        const document = await factoryApiService.updateDocument(docModel, req.body, next);

        res.status(200).json({
            status: 'success',
            data: document,
            message: 'tạo mới document thành công!'
        })
    }
}
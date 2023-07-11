const userModel = require('../model/userModel');
const factoryApi = require('../utils/factoryApiService');

module.exports = class user {
    static async createUser(req, res, next) {
        const user = await factoryApi.createDocument(userModel, req.body, next);

        if(user) {
            res.status(200).json({
                status: 'success',
                data: user,
                message: 'tạo mới người dùng thành công',
            })
        }
    }

    static async updateUser(req, res, next) {
        const user = await factoryApi.updateDocument(userModel, req.body, next, req.body.id);

        if(user) {
            res.status(200).json({
                status: 'success',
                data: user,
                message: 'cập nhật người dùng thành công',
            })
        }
    }

    static async deleteUser(req, res, next) {
        const user = await factoryApi.deleteDocument(userModel, next, req.body.id);

        if(user) {
            res.status(200).json({
                status: 'success',
                data: user,
                message: 'xóa người dùng thành công',
            })
        }
    }

    static async getUser(req, res, next) {
        const user = await factoryApi.getOneDocument(userModel, next, req.body.id, null);

        if(user) {
            res.status(200).json({
                status: 'success',
                data: user,
                message: 'tạo mới người dùng thành công',
            })
        }
    }

    static async getAllUser(req, res, next) {
        const user = await factoryApi.createDocument(userModel, req.body, next);

        if(user) {
            res.status(200).json({
                status: 'success',
                data: user,
                message: 'tạo mới người dùng thành công',
            })
        }
    }
}
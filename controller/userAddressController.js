const userAddressModel = require('../model/userAddressModel');
const factoryApi = require('../utils/factoryApiService');

module.exports = class userAddress {
    static async createUserAddress(req, res, next) {
        const userAddress = await factoryApi.createDocument(userAddressModel, req.body, next);

        if(userAddress) {
            res.status(200).json({
                status: 'success',
                data: userAddress,
                message: 'tạo mới địa chỉ người dùng thành công',
            })
        }
    }

    static async updateUserAddress(req, res, next) {
        const userAddress = await factoryApi.updateDocument(userAddressModel, req.body, next, req.body.id);

        if(userAddress) {
            res.status(200).json({
                status: 'success',
                data: userAddress,
                message: 'cập nhật địa chỉ người dùng thành công',
            })
        }
    }

    static async deleteUserAddress(req, res, next) {
        const userAddress = await factoryApi.deleteDocument(userAddressModel, next, req.body.id);

        if(userAddress) {
            res.status(200).json({
                status: 'success',
                data: userAddress,
                message: 'xóa địa chỉ người dùng thành công',
            })
        }
    }

    static async getUserAddress(req, res, next) {
        const userAddress = await factoryApi.getOneDocument(userAddressModel, next, req.body.id, null);

        if(userAddress) {
            res.status(200).json({
                status: 'success',
                data: userAddress,
                message: 'tạo mới địa chỉ người dùng thành công',
            })
        }
    }

    static async getAllUserAddress(req, res, next) {
        const userAddress = await factoryApi.createDocument(userAddressModel, req.body, next);

        if(userAddress) {
            res.status(200).json({
                status: 'success',
                data: userAddress,
                message: 'tạo mới địa chỉ người dùng thành công',
            })
        }
    }
}
const User = require('../../model/userModel');
const AppError = require('../../utils/appError');
module.exports = class UserService {
    static async getAllUser(next) {
        const users = await User.find().lean();

        if (users.length === 0) {
            return next(new AppError('lấy danh sách người dùng không thành công', 401));
        }
        return users;
    };

    static async getUserById(id, next) {
        const users = await User.find({_id: id}).lean();

        if (users.length === 0) {
            return next(new AppError('người dùng không tồn tại', 401));
        }
        return users;
    };

    static async updateUser(req, next) {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            select:  '-__v'
        }).lean();
        if  (!user) {
            return next(new AppError('người dùng không tồn tại', 401));
        }
        return user;
    }

    static async getCurrentUser(id, next) {
        const user = await User.findById(id).lean();
        if  (!user) {
            return next(new AppError('người dùng không tồn tại', 401));
        }
        return user;
    }

}
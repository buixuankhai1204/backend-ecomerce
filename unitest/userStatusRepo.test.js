const request = require("supertest");
const app = require("../app");
const {connect, disconnect} = require("../mongooseConfig");
const dotenv = require("dotenv");
const userStatusModel = require("../model/userModel");
const mongoose = require("mongoose");

describe('Test All test cases repository of message', () => {
    let userId = '';
    beforeAll(async () => {
        dotenv.config({ path: './config.env' });
        connect();
        const res = await request(app)
            .post('/api/v1/users/signin')
            .send({
                "email": "buixuankhai1806@gmail.com",
                "password": "buixuankhai1806"
            });
        token = res._body.token;
        userId = res._body.data._id;
    })

    describe('User Status Repoitory', () => {
        it('shouldReturnUserStatusByUserId', async () => {
            let userStatus = await userStatusModel.aggregate([{$match: {userModel: mongoose.Types.ObjectId(userId)}}]);
            expect(userStatus).not.toHaveLength(0);
        })

        it('shouldNotReturnAllMessageIfChannelIdDoesNotExist', async () => {
            const userId = "64df465c4fd5916745afd03f";
            let messages = await messageModel.aggregate([{$match: {userId: mongoose.Types.ObjectId(userId)}}]);
            expect(messages).toHaveLength(0);
        })
    })

    describe('Update User Status', () => {

        it('shouldNotReturnUpdateIfChannelIdDoesNotExist', async () => {
            var userId = "64df465c4fd5916745bfd02f";
            const userStatus = await userStatusModel.findById(userId);
            expect(userStatus).toBe(null);

        })
    })
    afterAll((done) => {
        disconnect(done);
    });
});


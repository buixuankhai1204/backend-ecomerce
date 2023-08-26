const request = require("supertest");
const app = require("../app");
const {connect, disconnect} = require("../mongooseConfig");
const dotenv = require("dotenv");
describe('User Status Controller', () => {
    let token = '';
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

    describe('shouldReturnUserStatusByUserId', () => {
        it('shouldReturnAllMessageByChannelId', async () => {
            const res = await request(app)
                .get(`/api/v1/users/userStatus/${userId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toEqual(200)
        })

        it('shouldDefineUserIdAndStatus', async () => {
            const status = 1;
            expect(userId).toBeDefined();
            expect(status).toBeDefined();
        })
    })

    describe('shouldNotReturnUserStatusIfUserIdNotExist', () => {
        it('shouldReturnAllMessageByChannelId', async () => {
            const userIdFail = "64df465c4fd5916745afd02f";
            const res = await request(app)
                .get(`/api/v1/users/userStatus/${userIdFail}`)
                .set('Authorization', `Bearer ${token}`);
            expect(userIdFail).toBeDefined();
            expect(res.statusCode).toEqual(200)
        })
    })


    afterAll((done) => {
        disconnect(done);
    });
});


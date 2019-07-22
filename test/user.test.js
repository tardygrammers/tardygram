require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');
const ensureAuth = require('../lib/middleware/ensure-auth');

describe('user routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let user = null;
  beforeEach(async() => {
    user = JSON.parse(JSON.stringify(await User.create({ email: 'test@test.com', password: 'testtest' })));
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('auth signup', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ email: 'test1@test.com', password: 'testtest' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'test1@test.com',
          __v: 0
        });
      });
  });
});

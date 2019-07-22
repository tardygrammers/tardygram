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

  const agent = request.agent(app);
  beforeEach(() => {
    return agent
      .post('/api/v1/auth/signin')
      .send({ email: user.email, password: 'testtest' });
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
  it('auth signin', async() => {
    return request(app)
      .post('/api/v1/auth/signin')
      .send({ email: user.email, password: 'testtest' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'test@test.com',
          __v: 0
        });
      });
  });
  it('verify user', async() => {
    return agent
      .get('/api/v1/auth/verify')
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'test@test.com',
          __v: 0
        });
      });
  });
});

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

  it('POST a tardyGram', () => {
    return agent
      .post('/api/v1/tardyGrams/')
      .send({ 
        photoUrl: 'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        caption: 'its a cat',
        tags: ['#yellow', '#tabby']
      })
      .then(res => {
        console.log(res.body, 'res.body')
        expect(res.body).toEqual({ 
          _id: expect.any(String),
          photoUrl: 'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          caption: 'its a cat',
          tags: ['#yellow', '#tabby'],
          user: {
            _id: expect.any(String),
            email: 'test@test.com',
            __v: 0
          },
          __v: 0
        });
      });
  });
});

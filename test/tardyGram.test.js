const { getAgent, getTardyGrams, getUsers } = require('./data-helpers');

describe('user routes', () => {
 
  it('POST a tardyGram', async() => {
    return getAgent()
      .post('/api/v1/tardyGrams/')
      .send({ 
        photoUrl: 'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        caption: 'its a cat',
        tags: ['#yellow', '#tabby']
      })
      .then(res => {
        expect(res.body).toEqual({ 
          _id: expect.any(String),
          photoUrl: 'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          caption: 'its a cat',
          tags: ['#yellow', '#tabby'],
          user: {
            username: expect.any(String),
            _id: expect.any(String),
            email: expect.any(String)
          }
        });
      });
  });

  it('GET all tardyGrams', async() => {
    const tardyGrams = getTardyGrams();
    return getAgent()
      .get('/api/v1/tardyGrams')
      .then(res => {
        tardyGrams.forEach(tardyGram => {
          expect(res.body).toContainEqual(tardyGram);
        });
      });
  });

  it('Can GET a tardyGram by id', async() => {
    const tardyGrams = getTardyGrams();
    return getAgent()
      .get(`/api/v1/tardyGrams/${tardyGrams[0]._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: expect.any(String),
          photoUrl: expect.any(String),
          caption: expect.any(String),
          tags: [expect.any(String)]
        });
      });
  });

  it('Can PATCH a tardyGram', async() => {
    const tardyGrams = getTardyGrams();
    const users = getUsers();
    const tardyGram = tardyGrams.find(tardyGram => tardyGram.user === users[0]._id);
    return getAgent()
      .patch(`/api/v1/tardyGrams/${tardyGram._id}`)
      .send({
        caption: 'nerd bomb'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: expect.any(String),
          photoUrl: expect.any(String),
          caption: 'nerd bomb',
          tags: [expect.any(String)]
        });
      });
  });

  it('Deletes a tardyGram', async() => {
    const tardyGrams = getTardyGrams();
    const users = getUsers();
    const tardyGram = tardyGrams.find(tardyGram => tardyGram.user === users[0]._id);
    return getAgent()
      .delete(`/api/v1/tardyGrams/${tardyGram._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: expect.any(String),
          photoUrl: expect.any(String),
          caption: expect.any(String),
          tags: [expect.any(String)]
        });
      });

  });
});


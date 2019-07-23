const { getAgent, getTardyGrams } = require('./data-helpers');

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
});

const { getAgent, getTardyGrams, getUsers, getComments } = require('./data-helpers');

describe('user routes', () => {
  it('POST a comment', async() => {
    const gram = await getTardyGrams()[0];
    return getAgent()
      .post('/api/v1/comments')
      .send({ 
        commentBy: gram.user,
        comment: 'This is a comment',
        tardyGram: gram._id
      })
      .then(res => {
        console.log(res.body, 'resbody');
        expect(res.body).toEqual({ 
          _id: expect.any(String),
          commentBy: expect.any(String),
          comment: expect.any(String),
          tardyGram: expect.any(String),
        });
      });
  });
});

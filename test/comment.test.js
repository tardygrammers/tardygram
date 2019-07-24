const { getAgent, getTardyGrams, getUsers, getComments } = require('./data-helpers');

describe('user routes', () => {
  it('POST a comment', async() => {
    const gram = getTardyGrams()[0];
    return getAgent()
      .post('/api/v1/comments')
      .send({ 
        commentBy: gram.user,
        comment: 'This is a comment',
        tardyGram: gram._id
      })
      .then(res => {
        expect(res.body).toEqual({ 
          _id: expect.any(String),
          commentBy: expect.any(String),
          comment: expect.any(String),
          tardyGram: expect.any(String)
        });
      });
  });

  it('can DELETE a comment', async() => {
    const comment = getComments();
    return getAgent()
      .delete(`/api/v1/comments/${comment[0]._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          commentBy: expect.any(String),
          comment: expect.any(String),
          tardyGram: expect.any(String),
        });
      });
  });
});

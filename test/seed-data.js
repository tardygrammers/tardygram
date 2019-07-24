const User = require('../lib/models/User');
const TardyGram = require('../lib/models/Tardygram');
const Comment = require('../lib/models/Comment');
const chance = require('chance').Chance();

module.exports = async({ users = 10, tardyGrams = chance.integer({ min: 10, max: 20 }), comments = chance.integer({ min: 1, max: 10 }) } = { users: 10, tardyGrams: chance.integer({ min: 10, max: 20 }), comments: chance.integer({ min: 1, max: 10 }) }) => {
  const createdUsers = await User.create(
    [...Array(users)].map(() => ({
      username: chance.name(),
      email: chance.email(),
      password: 'password'
    }))
  );

  const createdTardyGrams = await TardyGram.create(
    [...Array(tardyGrams)].map(() => ({
      user: chance.pickone(createdUsers)._id,
      photoUrl: chance.url({ path: 'images' }),
      caption: chance.sentence(),
      tags: [chance.hashtag()]
    }))
  );

  const createdComments = await Comment.create(
    [...Array(comments)].map(() => ({
      commentBy: chance.pickone(createdUsers)._id,
      comment: chance.sentence(),
      tardyGram: chance.pickone(createdTardyGrams)._id
    }))
  );

  return {
    users: createdUsers,
    tardyGrams: createdTardyGrams,
    comments: createdComments
  };
};

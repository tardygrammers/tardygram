const User = require('../lib/models/User');
const TardyGram = require('../lib/models/Tardygram');
const chance = require('chance').Chance();

module.exports = async({ users = 5, tardyGrams = 10 } = { users: 5, tardyGrams: 10 }) => {
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

  return {
    users: createdUsers,
    tardyGrams: createdTardyGrams
  };
};

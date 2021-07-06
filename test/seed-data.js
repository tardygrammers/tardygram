const User = require('../lib/models/User');
const TardyGram = require('../lib/models/Tardygram');
const Comment = require('../lib/models/Comment');
const chance = require('chance').Chance();

module.exports = async({ users = 30, maxTardyGrams = 30, maxComments = 50 } = {}) => {
  const createdUsers = await User.create(
    [...Array(users)].map(() => ({
      username: chance.name(),
      email: chance.email(),
      password: 'password'
    }))
  );

  const gramsToCreate = createdUsers
    .flatMap(user => {
      return [...Array(chance.integer({ min: 2, max: maxTardyGrams }))]
        .map(() => ({
          user: user._id,
          photoUrl: chance.url({ path: 'images' }),
          caption: chance.sentence(),
          tags: [...Array(chance.integer({ min: 1, max: 10 }))]
            .map(() => chance.hashtag())
        }));
    });
 
  const createdTardyGrams = await TardyGram.create(
    gramsToCreate
  );

  const commentsToCreate = createdTardyGrams
    .flatMap(gram => {
      return [...Array(chance.integer({ min: 2, max: maxComments }))]
        .map(() => ({
          commentBy: chance.pickone(createdUsers)._id,
          comment: chance.sentence(),
          tardyGram: gram._id 
        }));
    });

  const createdComments = await Comment.create(
    commentsToCreate
  );

  return {
    users: createdUsers,
    tardyGrams: createdTardyGrams,
    comments: createdComments
  };
};

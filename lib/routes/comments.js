const { Router } = require('express');
const Comment = require('../models/Comment');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const {
      comment,
      commentBy,
      tardyGram
    } = req.body;

    Comment
      .create({
        commentBy,
        comment,
        tardyGram
      })
      .then(comment => res.send(comment))
      .catch(next);
  });

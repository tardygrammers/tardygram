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
  })

  .get('/popular', (req, res, next) => {
    const { n = 10 } = req.query;
    Comment
      .popular(n)
      .then(grams => res.send(grams))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Comment   
      .findByIdAndDelete({ _id: req.params.id, user: req.user._id  })
      .then(comment => {
        if(!comment) {
          const err = new Error('you dont have permission');
          err.status = 401;
          next(err);
        } else {
          res.send(comment);
        }
      })
      .catch(next);
  });
  

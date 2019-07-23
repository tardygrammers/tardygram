const { Router } = require('express');
const TardyGram = require('../models/Tardygram');
const User = require('../models/User');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const {
      photoUrl,
      caption,
      tags
    } = req.body;

    const user = req.user;

    TardyGram
      .create({
        user,
        photoUrl,
        caption,
        tags
      })
      .then(tardygram => res.send(tardygram))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    TardyGram
      .find()
      .select({ __v: false, username: false })
      .then(grams => res.send(grams))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    TardyGram
      .findById(req.params.id)
      .then(tardyGram => res.send(tardyGram))
      .catch(next);
  });

    


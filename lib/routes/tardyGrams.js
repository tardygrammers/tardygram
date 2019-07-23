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
  });

    


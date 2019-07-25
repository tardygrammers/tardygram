const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()

  .get('/prolific', (req, res, next) => {
    const { n = 10 } = req.query;
    User
      .prolific(n)
      .then(grams => res.send(grams))
      .catch(next);
  });


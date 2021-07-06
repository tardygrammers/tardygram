const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()

  .get('/prolific', (req, res, next) => {
    const { n = 10 } = req.query;
    User
      .prolific(n)
      .then(users => res.send(users))
      .catch(next);
  })

  .get('/leader', (req, res, next) => {
    const { n = 10 } = req.query;
    User  
      .leader(n)
      .then(users => res.send(users))
      .catch(next);
  });


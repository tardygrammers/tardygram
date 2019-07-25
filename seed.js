const mongoose = require('mongoose');
require('dotenv').config();
require('./lib/utils/connect')();

mongoose.connection.dropDatabase()
  .then(() => {
    return require('./test/seed-data')();
  })
  .then(() => {
    console.log('done seeding the database');
  })
  .finally(() => {
    return mongoose.connection.close();
  });

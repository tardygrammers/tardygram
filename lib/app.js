const express = require('express');
const ensureAuth = require('./middleware/ensure-auth');
const app = express();

app.use(express.json());

// app.use('/api/v1/RESOURCE', require('./routes/resource'));
// app.use(ensureAuth);
app.use('/api/v1/auth', require('./routes/auth'));


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

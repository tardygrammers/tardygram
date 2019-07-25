const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(require('cookie-parser')());
// app.use('/api/v1/RESOURCE', require('./routes/resource'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/tardyGrams', require('./routes/tardyGrams'));
app.use('/api/v1/comments', require('./routes/comments'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

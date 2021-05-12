const express = require('express');
const logger = require ('../api/middleware/middleware')
const server = express();
const usersRouter = require('./users/users-router')

// remember express by default cannot parse JSON in request bodies
server.use(express.json());

// global middlewares and the user's router need to be connected here

// function methodLogger(req, res, next) {
//   console.log('Request method: ',req.method, 'Request URL: ', req.url, 'Timestamp: ',new Date().toISOString());

//   next();
// }
server.use(logger);
server.use('/api/users', usersRouter)
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;

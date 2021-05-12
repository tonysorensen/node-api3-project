function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log('Request method: ',req.method, 'Request URL: ', req.url, 'Timestamp: ',new Date().toISOString());

  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = logger
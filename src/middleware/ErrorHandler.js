const message = require('../../config/constant');

exports.errorHandler = (err, req, res, next) => {
    res.locals.message = err.message || message.serverError;
    res.status(err.status || 500).json({status:false, message:res.locals.message});
  }
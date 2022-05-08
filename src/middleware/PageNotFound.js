const message = require('../../config/constant');

exports.pageNotFound = (req, res, next) => {
    var err = new Error(message.pageNotFound);
    err.status = 404;
    next(err);
}
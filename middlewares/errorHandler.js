const ErrorResponse = require('../utils/error');

const errorHandler = (err, req, res, next) => {
  let error = { ...err }

  error.message = err.message;
  //Log to console for dev
  console.log(err);

  //Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Not a valid MongoDB id`;
    error = new ErrorResponse(message, 404);
  }

  //Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

 
  //Mongoose unauthorized Role
  if (err.code === 401) {
    const message = 'Unauthorized';
    error = new ErrorResponse(message, 401);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server error'
  });
}

module.exports = errorHandler;
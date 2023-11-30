const {StatusCodes} = require('http-status-codes')

const ErrorHandler = (err,req, res, next)=>{
  let error = {
    // statusCode: err.statusCode ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR,
    // msg: err.message ? err.message : "Something Went Wrong, Please Try Again Later!"
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something Went Wrong, Please Try Again Later!"
  }

  return res.status(error.statusCode).json({msg: error.msg})
}

module.exports = ErrorHandler;

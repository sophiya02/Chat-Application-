const CustomApiError = require('./custom-api')
const ConflictError = require('./conflict')
const BadRequestError = require('./bad-request')
const UnauthenticatedError = require('./unauthenticated')

module.exports={
  CustomApiError,
  ConflictError,
  BadRequestError,
  UnauthenticatedError
}

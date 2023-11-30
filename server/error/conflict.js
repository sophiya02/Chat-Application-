const {StatusCodes} = require('http-status-codes');
const CustomApiError = require('./custom-api');

class ConflictError extends CustomApiError{
    constructor(message){
        super(message);
        this.statusCode= StatusCodes.CONFLICT;
    }
}

module.exports = ConflictError

const ExtendableError = require('./extendable.js');

class InvalidObjectError extends ExtendableError {
    constructor(message, status = 400) {
        super(message, status);
    }
}

module.exports = InvalidObjectError;

const ExtendableError = require('./extendable.js');

class InternalError extends ExtendableError {
    constructor(message, status = 500) {
        super(message, status);
    }
}

module.exports = InternalError;
const ExtendableError = require('./extendable.js');

class MissingError extends ExtendableError {
    constructor(message, status = 404) {
        super(message, status);
    }
}

module.exports = MissingError;

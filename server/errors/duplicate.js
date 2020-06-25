const ExtendableError = require('./extendable.js');

class DuplicateObjectError extends ExtendableError {
    constructor(message, status = 409) {
        super(message, status);
    }
}

module.exports = DuplicateObjectError;

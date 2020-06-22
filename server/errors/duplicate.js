const ExtendableError = require('./extendable.js');

class DuplicateObjectError extends ExtendableError {
    constructor(name, status) {
        super(name, 404);
    }
}

module.exports = DuplicateObjectError;

const ExtendableError = require('./extendable.js');

class InternalError extends ExtendableError {
    constructor(name, status) {
        super(name, 500);
    }
}

module.exports = InternalError;
const ExtendableError = require('./extendable.js');

class NotFoundError extends ExtendableError {
    constructor(name, status) {
        super(name, 404);
    }
}

module.exports = NotFoundError;
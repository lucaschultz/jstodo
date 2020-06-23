const ExtendableError = require('./extendable.js');

class MissingError extends ExtendableError {
    constructor(name, status) {
        super(name, 404);
    }
}

module.exports = MissingError;

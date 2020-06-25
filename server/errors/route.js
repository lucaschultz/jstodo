const ExtendableError = require('./extendable.js');

class InvalidRouteError extends ExtendableError {
    constructor(message, status = 501) {
        super(message, status);
    }
}

module.exports = InvalidRouteError;

import ExtendableError from './extendable.mjs';

class InvalidObjectError extends ExtendableError {
    constructor(message, status = 400) {
        super(message, status);
    }
}

export default InvalidObjectError;

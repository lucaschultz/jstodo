import ExtendableError from './extendable.mjs';

class InternalError extends ExtendableError {
    constructor(message, status = 500) {
        super(message, status);
    }
}

export default InternalError;
import ExtendableError from './extendable.mjs';

class MissingError extends ExtendableError {
    constructor(message, status = 404) {
        super(message, status);
    }
}

export default MissingError;

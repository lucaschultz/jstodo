import ExtendableError from './extendable.mjs';

class DuplicateObjectError extends ExtendableError {
    constructor(message, status = 409) {
        super(message, status);
    }
}

export default DuplicateObjectError;

import ExtendableError from './extendable.mjs';

class InvalidRouteError extends ExtendableError {
    constructor(message, status = 501) {
        super(message, status);
    }
}

export default InvalidRouteError;

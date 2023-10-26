const { AppError } = require("./AppError");

class UnknownCounterError extends AppError {
    /**
     * @param {number} id The counter identifier
     */
    constructor(id) {
        super(`Unknown counter with id "${id}"`, 404);
    }

    /**
     * @inheritDoc
     *
     * @override
     */
    toJSON() {
        return {
            message: this.message
        }
    }
}

module.exports = { UnknownCounterError };

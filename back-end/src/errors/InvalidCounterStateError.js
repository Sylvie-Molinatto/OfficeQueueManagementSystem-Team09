const { AppError } = require("./AppError");

class InvalidCounterStateError extends AppError {
    /**
     * @param {string} msg The error message
     */
    constructor(msg) {
        super(msg, 400);
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

module.exports = { InvalidCounterStateError };

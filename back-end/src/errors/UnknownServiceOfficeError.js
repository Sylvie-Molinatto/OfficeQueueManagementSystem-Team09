const { AppError } = require("./AppError");

class UnknownServiceOfficeError extends AppError {
    /**
     * @param {string} code The service identifier code
     */
    constructor(code) {
        super(`The service "${code}" targeted by the request is unknown.`, 404);
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

module.exports = { UnknownServiceOfficeError };

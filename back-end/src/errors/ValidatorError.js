const { AppError } = require("./AppError");

class ValidatorError extends AppError {
    /**
     * @param {import('ajv').ErrorObject[]} errors
     */
    constructor(errors) {
        super('One or more properties are invalid and/or missing.', 400);

        this.errors = errors;
    }

    /**
     * @inheritDoc
     *
     * @override
     */
    toJSON() {
        return {
            message: this.message,
            errors: this.errors.map( err => {
                return {
                    message: err.message,
                    property: err.instancePath,
                    errorCode: err.keyword
                }
            })
        }
    }
}

module.exports = { ValidatorError };

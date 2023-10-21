class AppError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status || 500;
    }

    /**
     * Generate a JSON representation of the error
     *
     * @return { Record<string, any> }
     */
    toJSON() {
        return {
            message: this.message
        }
    }

    /**
     * Send a response to the client
     *
     * @param {import('express').Response} res
     */
    sendHttpResponse(res) {
        return res.status(this.status).send( this.toJSON() );
    }
}

module.exports = { AppError };

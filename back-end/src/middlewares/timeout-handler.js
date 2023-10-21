function timeoutHandlerMiddleware(req, res, next) {
    setTimeout(() => {
        if (res.headersSent) {
            return;
        }

        res.status(408).send({ message: 'Request timeout, the server is taking too long to respond.' });
    });

    next();
}

module.exports = {
    timeoutHandlerMiddleware
};

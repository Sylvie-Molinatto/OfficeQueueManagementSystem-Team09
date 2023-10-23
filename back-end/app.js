require('dotenv').config();

const express = require('express');
const { timeoutHandlerMiddleware } = require("./src/middlewares/timeout-handler");
const { AppError } = require("./src/errors/AppError");


const app = express()
    .disable('x-powered-by')
    .use( express.static(__dirname + '/public') )
    .use( express.json() )
    .use( express.urlencoded({ extended: true }) )
    .use( timeoutHandlerMiddleware );

// Routes
app.use('/api/dummy', require('./src/routes/dummy') );

// Error handler
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof AppError) {
        return err.sendHttpResponse(res);
    } else {
        console.error(err);

        res.status(500).send({ message: err.message || 'Internal server error' });
    }
});

module.exports = app;

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { timeoutHandlerMiddleware } = require("./src/middlewares/timeout-handler");
const { AppError } = require("./src/errors/AppError");


const app = express()
    .disable('x-powered-by')
    .use( cors({ origin: 'http://localhost:5173' }) )
    .use( express.static(__dirname + '/public') )
    .use( express.json() )
    .use( express.urlencoded({ extended: true }) )
    .use( timeoutHandlerMiddleware );

// Routes
app.use('/api/services', require('./src/routes/services') );
app.use('/api/counters', require('./src/routes/counters') );

// Error handler
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof AppError) {
        return err.sendHttpResponse(res);
    } else {
        console.error(err);

        res.status(500).send({ message: 'Internal server error' });
    }
});

module.exports = app;

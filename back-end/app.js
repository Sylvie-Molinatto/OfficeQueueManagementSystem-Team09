require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { timeoutHandlerMiddleware } = require("./src/middlewares/timeout-handler");
const { AppError } = require("./src/errors/AppError");
const corsOptions = {
    origin: 'http://localhost:5173',
};


const app = express()
    .disable('x-powered-by')
    .use( express.static(__dirname + '/public') )
    .use( express.json() )
    .use( express.urlencoded({ extended: true }) )
    .use( timeoutHandlerMiddleware );

// Cors
app.use(cors(corsOptions));

// Routes
app.use('/api/services', require('./src/routes/services') );

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

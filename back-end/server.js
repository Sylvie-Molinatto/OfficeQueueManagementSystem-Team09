const http = require('http');
const app = require('./app');

// Start server
const portValue = (process.env.PORT || '3000');
let port = parseInt(portValue, 10);
port = isNaN(port) ? portValue : port;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server 'error' event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error
    }
}

/**
 * Event listener for HTTP server 'listening' event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    console.log('Listening on ' + bind)
}

/*
 * Catch ERR_HTTP_HEADERS_SENT and ignore it
 */
process.on('uncaughtException', function(err) {
    if (err && err.code && err.code === 'ERR_HTTP_HEADERS_SENT') {
        return
    }
    throw err
});

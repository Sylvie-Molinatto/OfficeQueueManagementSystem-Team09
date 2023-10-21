const { validate } = require("../validators");

async function sendHelloWorld(req, res, next) {
    try {
        const query = req.query;
        validate('QueryParamsHello', query);

        res.status(200).send(`Hello ${query.name || 'World'}!`)
    } catch (err) {
        next(err)
    }
}

module.exports = { sendHelloWorld };

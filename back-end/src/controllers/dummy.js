const { validate } = require("../validators");
const db = require("../services/db");

async function sendHelloWorld(req, res, next) {
    try {
        const query = req.query;
        validate('QueryParamsHello', query);

        res.status(200).send(`Hello ${query.name || 'World'}!`)
    } catch (err) {
        next(err)
    }
}

async function getCounters(req, res, next) {
    try {
        const counters = db.prepare('SELECT * FROM counters').all();

        res.status(200).json(counters);
    } catch (err) {
        next(err);
    }
}

module.exports = { sendHelloWorld, getCounters };

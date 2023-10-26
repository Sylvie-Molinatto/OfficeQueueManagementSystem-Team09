const service = require('../services/counters');
const { UnknownCounterError } = require("../errors/UnknownCounterError");

async function listCounters(req, res, next) {
    try {
        const counters = await service.list();

        res.json( counters );
    } catch (err) {
        next(err);
    }
}

async function getCounterById(req, res, next) {
    try {
        const idStr = req.params.id;
        const id = Number(idStr);
        if (isNaN(id)) {
            throw new UnknownCounterError(idStr);
        }

        const counter = await service.getCounterById(id);

        res.json( counter );
    } catch (err) {
        next(err);
    }
}

module.exports = { listCounters, getCounterById };

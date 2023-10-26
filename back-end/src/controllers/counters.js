const service = require('../services/counters');
const serializer = require('../services/serializer');
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
        const id = _extractCounterIdFromReq(req);

        const counter = await service.getCounterById(id);

        res.json( counter );
    } catch (err) {
        next(err);
    }
}

async function indicateTicketServed(req, res, next) {
    try {
        const id = _extractCounterIdFromReq(req);

        const ticket = await service.indicateTicketAsServed(id);

        res.json( serializer.serializeTicket(ticket) );
    } catch (err) {
        next(err);
    }
}

async function getPendingTicket(req, res, next) {
    try {
        const id = _extractCounterIdFromReq(req);

        const ticket = await service.pendingTicket(id); 
        console.log(ticket);

        res.json( serializer.serializeTicket(ticket) );
    } catch (err) {
        next(err);
    }
}

async function callCustomer(req, res, next) {
    try {
        const id = _extractCounterIdFromReq(req);

        const ticket = await service.callCustomer(id);

        res.json( serializer.serializeTicket(ticket) );
    } catch (err) {
        next(err);
    }
}

module.exports = { listCounters, getCounterById, indicateTicketServed, callCustomer, getPendingTicket };

function _extractCounterIdFromReq(req) {
    const idStr = req.params.id;
    const id = Number(idStr);
    if (isNaN(id)) {
        throw new UnknownCounterError(idStr);
    }

    return id;
}

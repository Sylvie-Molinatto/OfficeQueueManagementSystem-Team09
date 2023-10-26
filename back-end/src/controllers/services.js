const service = require('../services/office-queue');
const serializer = require('../services/serializer');
const { UnknownServiceOfficeError } = require("../errors/UnknownServiceOfficeError");

async function getAllServices(req, res, next) {
    try {
        const services = await service.getAllServices();

        res.status(200).json( services.map(serializer.serializeTicket) );
    } catch (err) {
        next(err);
    }
}

async function addTicketToQueue(req, res, next) {
    try {
        if (!req.params.code) {
            throw new UnknownServiceOfficeError("")
        }

        const ticket = await service.addTicketToQueue(req.params.code);

        res.status(201).json( serializer.serializeTicket(ticket) );
    } catch (err) {
        next(err);
    }
}

module.exports = { getAllServices, addTicketToQueue };

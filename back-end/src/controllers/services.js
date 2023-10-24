const service = require('../services/office-queue');
const { UnknownServiceOfficeError } = require("../errors/UnknownServiceOfficeError");

async function addTicketToQueue(req, res, next) {
    try {
        if (!req.params.code) {
            throw new UnknownServiceOfficeError("")
        }

        const ticket = await service.addTicketToQueue(req.params.code);

        res.status(201).json(ticket);
    } catch (err) {
        next(err);
    }
}

module.exports = { addTicketToQueue };

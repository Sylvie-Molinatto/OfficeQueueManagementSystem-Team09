const service = require('../services/office-queue');
const { UnknownServiceOfficeError } = require("../errors/UnknownServiceOfficeError");

async function addTicketToQueue(req, res, next) {
    try {
        if (!req.params.code) {
            throw new UnknownServiceOfficeError("")
        }

        const ticket = await service.addTicketToQueue(req.params.code);

        res.status(201).json( serializeTicket(ticket) );
    } catch (err) {
        next(err);
    }
}

module.exports = { addTicketToQueue };

/**
 * @param {Ticket} ticket
 * @return {TicketSerialized}
 */
function serializeTicket(ticket) {
    return {
        id: ticket.id,
        serviceCode: ticket.service_code,
        creationDate: ticket.creation_date,
        counterId: ticket.counter_id,
        servingDate: ticket.serving_date,
        completionDate: ticket.completion_date,
    };
}

/**
 * @typedef {Object} TicketSerialized
 *
 * @property {number} id The ticket id
 * @property {string} serviceCode The service identifier code
 * @property {string} creationDate The creation date of the ticket in ISO 8601 format
 * @property {number | null} counterId The id of the counter that serve the ticket
 * @property {string | null} servingDate The date when the ticket was called in ISO 8601 format
 * @property {string | null} completionDate The date when the ticket was served in ISO 8601 format
 */

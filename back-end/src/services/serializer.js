class SerializerService {
    /**
     * @param {Ticket} ticket
     * @return {TicketSerialized}
     */
    serializeTicket(ticket) {
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
     * @param {Service} service
     * @return {ServiceSerialized}
     */
    serializeService(service) {
        return {
            code: service.code,
            label: service.label,
            description: service.description,
        };
    }
}

const service = new SerializerService();

module.exports = service;

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

/**
 * @typedef {Object} ServiceSerialized
 *
 * @property {string} code The code of the service
 * @property {string} label The label of the service
 * @property {string} description The description of the service
 */

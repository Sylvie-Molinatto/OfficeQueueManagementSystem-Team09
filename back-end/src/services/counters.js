const db = require("./db");
const { UnknownCounterError } = require("../errors/UnknownCounterError");
const { InvalidCounterStateError } = require("../errors/InvalidCounterStateError");

class CountersService {
    /**
     * @return {Promise<Counter[]>}
     */
    async list() {
        const rows = db.prepare("SELECT * FROM counters").all();

        return rows.map( row => this._formatCounterFromRow(row) );
    }

    /**
     * @param {number} id
     *
     * @return {Promise<Counter>}
     */
    async getCounterById(id) {
        /** @type {CounterRow | undefined} */
        const row = db.prepare("SELECT * FROM counters WHERE id = ?").get(id);
        if (!row) {
            throw new UnknownCounterError(id);
        }

        /** @type {Ticket | null} */
        const ticket = db.prepare("SELECT * FROM tickets WHERE counter_id = ? AND completion_date IS NULL").get(id) ?? null;
        /** @type {ServiceRow[]} */
        const servicesManaged = db.prepare("SELECT * FROM services LEFT OUTER JOIN main.counters_services cs on services.code = cs.service_code WHERE counter_id = ?").all(id);

        return this._formatCounterFromRow(row, ticket, servicesManaged);
    }

    /**
     * @param {number} id
     *
     * @return {Promise<Ticket>}
     */
    async indicateTicketAsServed(id) {
        const res = db.prepare("UPDATE tickets SET completion_date = datetime('now') WHERE counter_id = ? AND serving_date IS NOT NULL AND completion_date IS NULL").run(id);
        if (res.changes !== 1) {
            // Invalid counter id or no ticket currently served, try to determine which one
            const counter = db.prepare("SELECT * FROM counters WHERE id = ?").get(id);
            if (counter) {
                throw new InvalidCounterStateError(`The counter with "${id}" is not serving a ticket.`)
            } else {
                throw new UnknownCounterError(id);
            }
        }

        return db.prepare("SELECT * FROM tickets WHERE counter_id = ?").get(id);
    }


    /**
     * @param {CounterRow} row
     * @param {Ticket | null} [ticket]
     * @param {ServiceRow[]} [servicesManaged]
     *
     * @return {Counter}
     * @private
     */
    _formatCounterFromRow(row, ticket, servicesManaged) {
        return {
            id: row.id,
            available: Boolean(row.available),
            currentTicket: ticket,
            services: servicesManaged.map( service => ({
                code: service.code,
                label: service.label,
                description: service.description,
            }) )
        };
    }
}

const service = new CountersService();

module.exports = service;

/**
 * @typedef {Object} Counter
 *
 * @property {number} id The counter id
 * @property {boolean} available The availability of the counter
 * @property {Ticket | null} currentTicket The current ticket served by the counter
 */

/**
 * @typedef {Object} CounterRow
 *
 * @property {number} id The counter id
 * @property {number} available The availability of the counter
 */

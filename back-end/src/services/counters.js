const db = require("./db");
const { UnknownCounterError } = require("../errors/UnknownCounterError");
const { InvalidCounterStateError } = require("../errors/InvalidCounterStateError");
const dayjs = require("dayjs");

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

        const ticket = this._getCurrentTicketServed(id) ?? null;
        /** @type {Service[]} */
        const servicesManaged = db.prepare("SELECT * FROM services LEFT OUTER JOIN main.counters_services cs on services.code = cs.service_code WHERE counter_id = ?").all(id);

        return this._formatCounterFromRow(row, ticket, servicesManaged);
    }

    /**
     * @param {number} id
     *
     * @return {Promise<Ticket>}
     */
    async indicateTicketAsServed(id) {
        const date = dayjs().format("YYYY-MM-DD HH:mm:ss");
        const res = db.prepare("UPDATE tickets SET completion_date = ? WHERE counter_id = ? AND serving_date IS NOT NULL AND completion_date IS NULL").run(date, id);
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
     * @param {number} id
     *
     * @return {Promise<Ticket>}
     */
    async callCustomer(id) {
        const cnt_id = parseInt(id);
        const date = dayjs().format("YYYY-MM-DD HH:mm:ss");
        // Self-called transaction
        db.transaction(() => {
            const counter = db.prepare("SELECT * FROM counters WHERE id = ?").get(cnt_id);
            if (!counter) {
                throw new UnknownCounterError(id);
            }

            const ticketAssigned = this._getCurrentTicketServed(cnt_id);
            if (ticketAssigned) {
                throw new InvalidCounterStateError(`The counter with "${cnt_id}" is already serving a ticket and cannot call another customer.`)
            }

            const res = db.prepare("UPDATE tickets SET counter_id = ?, serving_date = ? WHERE counter_id IS NULL AND serving_date IS NULL AND completion_date IS NULL AND service_code IN (SELECT service_code FROM counters_services WHERE counter_id = ?)").run(id, date, id);
            if (res.changes !== 1) {
                throw new InvalidCounterStateError(`No customer waiting for the counter with "${cnt_id}".`)
            }
        })();

        return this._getCurrentTicketServed(cnt_id);
    }


    /**
     * @param {CounterRow} row
     * @param {Ticket | null} [ticket]
     * @param {Service[]} [servicesManaged]
     *
     * @return {Counter}
     * @private
     */
    _formatCounterFromRow(row, ticket, servicesManaged) {
        return {
            id: row.id,
            available: Boolean(row.available),
            currentTicket: ticket,
            services: servicesManaged?.map( service => ({
                code: service.code,
                label: service.label,
                description: service.description,
            }) )
        };
    }

    /**
     * @param {number} id
     *
     * @return {Ticket | undefined}
     * @private
     */
    _getCurrentTicketServed(id) {
        return db.prepare("SELECT * FROM tickets WHERE counter_id = ? AND serving_date IS NOT NULL AND completion_date IS NULL").get(id);
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
 * @property {Service[]} services The list of services managed by the counter
 */

/**
 * @typedef {Object} CounterRow
 *
 * @property {number} id The counter id
 * @property {number} available The availability of the counter
 */
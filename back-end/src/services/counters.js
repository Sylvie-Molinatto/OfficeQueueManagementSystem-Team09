const db = require("./db");
const { UnknownCounterError } = require("../errors/UnknownCounterError");

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
        const row = db.prepare("SELECT * FROM counters WHERE id = ?").get(id);

        if (!row) {
            throw new UnknownCounterError(id);
        }

        return this._formatCounterFromRow(row);
    }


    /**
     * @param {CounterRow} row
     * @return {Counter}
     * @private
     */
    _formatCounterFromRow(row) {
        return {
            id: row.id,
            available: Boolean(row.available),
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
 */

/**
 * @typedef {Object} CounterRow
 *
 * @property {number} id The counter id
 * @property {number} available The availability of the counter
 */

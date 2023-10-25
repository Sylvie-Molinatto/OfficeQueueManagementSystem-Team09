const { SqliteError } = require("better-sqlite3");
const db = require("./db");
const { UnknownServiceOfficeError } = require("../errors/UnknownServiceOfficeError");

class OfficeQueueService {

    /**
     * @returns {Promise<Service[]>}
     */
    async getAllServices() {
        return db.prepare('SELECT * FROM services').all();
    }

    /**
     * @param {string} code The service identifier code
     *
     * @returns {Promise<Ticket>} The ticket added to the queue
     */
    async addTicketToQueue(code) {
        try {
            /** @type {InsertQueryResult} */
            const res = db.prepare('INSERT INTO tickets (service_code) VALUES (?)').run(code);
            if (res.changes !== 1) {
                // Should never happen
                throw new Error('Nothing change in the service queue.');
            }

            return db.prepare('SELECT * FROM tickets WHERE id = ?').get(res.lastInsertRowid);
        } catch (e) {
            if (e instanceof SqliteError && e.code === 'SQLITE_CONSTRAINT_FOREIGNKEY') {
                throw new UnknownServiceOfficeError(code);
            }

            throw e;
        }
    }
}

const service = new OfficeQueueService();

module.exports = service;

/**
 * @typedef {Object} Ticket
 *
 * @property {number} id The ticket id
 * @property {string} service_code The service identifier code
 * @property {string} creation_date The creation date of the ticket in ISO 8601 format
 * @property {number | null} counter_id The id of the counter that serve the ticket
 * @property {string | null} serving_date The date when the ticket was called in ISO 8601 format
 * @property {string | null} completion_date The date when the ticket was served in ISO 8601 format
 */

/**
 * @typedef {Object} Service
 *
 * @property {string} code The service identifier code
 * @property {string} label The service label
 * @property {string} description The service description
 */

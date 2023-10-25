require('jest');
const db = require('../src/services/db');
const service = require("../src/services/office-queue");
const { UnknownServiceOfficeError } = require("../src/errors/UnknownServiceOfficeError");

describe('[SERVICE] Check office queue service', () => {
    const ticketIdsToDelete = [];

    afterAll(() => {
        for (const ticketId of ticketIdsToDelete) {
            db.prepare('DELETE FROM tickets WHERE id = ?').run(ticketId);
        }
    });

    describe('Add ticket to a service queue', () => {
        let officeService;
        beforeAll(() => {
            officeService = db.prepare('SELECT * FROM services LIMIT 1').get();

            expect(officeService).toHaveProperty('code');
            expect(officeService).toHaveProperty('label');
        });

        test('should return a ticket', async () => {
            const ticket = await service.addTicketToQueue(officeService.code);

            expect(ticket).toHaveProperty('id');
            ticketIdsToDelete.push(ticket.id);
            expect(ticket).toHaveProperty('service_code');
            expect(ticket).toHaveProperty('creation_date');
            expect(ticket).toHaveProperty('counter_id');
            expect(ticket).toHaveProperty('serving_date');
            expect(ticket).toHaveProperty('completion_date');
        });

        test('should throw an error since service doesn\'t exist', async () => {
            return expect(service.addTicketToQueue('unknown-service'))
                .rejects.toThrow(UnknownServiceOfficeError);
        });
    });

    describe('Retrieve all services', () => {
        test('Should return all services', async () => {
            const result = await service.getAllServices();

            expect(Array.isArray(result)).toBe(true); // Check if the result is an array

            result.forEach(service => {
            expect(service).toHaveProperty('label');
            expect(service).toHaveProperty('description');
            expect(service).toHaveProperty('code');
            });
        });

    });
});

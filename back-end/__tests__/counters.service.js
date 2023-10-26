require('jest');
const db = require('../src/services/db');
const service = require("../src/services/counters");
const { UnknownCounterError } = require("../src/errors/UnknownCounterError");
const { InvalidCounterStateError } = require("../src/errors/InvalidCounterStateError");

describe('[SERVICE] Check counters service', () => {
    describe('List all counters', () => {
        test('should return all counters', async () => {
            const counters = await service.list();

            for (const counter of counters) {
                expect(counter).toHaveProperty('id');
                expect(counter).toHaveProperty('available');
                expect(counters).not.toHaveProperty('currentTicket');
                expect(counters).not.toHaveProperty('services');
            }
        });
    });

    describe('Get counter by it\'s ID', () => {
        test('should return a counter with the given ID', async () => {
            const counter = await service.getCounterById(1);

            expect(counter).toHaveProperty('id');
            expect(counter).toHaveProperty('available');
            expect(counter).toHaveProperty('currentTicket');
            expect(counter).toHaveProperty('services');
        });

        test('should throw an error if the counter does not exist', async () => {
            await expect(service.getCounterById(999)).rejects.toThrow(UnknownCounterError);
        });

        test('should throw an error if the counter ID is not a number', async () => {
            await expect(service.getCounterById('a')).rejects.toThrow(UnknownCounterError);
        });
    });

    describe('Request new customer', () => {
        let ticket;
        beforeAll(() => {
            const { lastInsertRowid } = db.prepare('INSERT INTO tickets (service_code) VALUES (?)').run('A01');

            ticket = db.prepare('SELECT * FROM tickets WHERE id = ?').get(lastInsertRowid);
        });
        afterAll(() => {
            db.prepare('DELETE FROM tickets WHERE id = ?').run(ticket.id);
        });

        test('should return the ticket', async () => {
            const ticket = await service.callCustomer(1);

            expect(ticket).toHaveProperty('id');
            expect(ticket).toHaveProperty('service_code');
            expect(ticket).toHaveProperty('serving_date');
            expect(ticket).toHaveProperty('completion_date');
            expect(ticket).toHaveProperty('counter_id');
        });

        test('should throw an error if the counter does not exist', async () => {
            await expect(service.callCustomer(999)).rejects.toThrow(UnknownCounterError);
        });

        test('should throw an error if the counter is already serving a customer', async () => {
            await expect(service.callCustomer(1)).rejects.toThrow(InvalidCounterStateError);
        });

        test('should throw an error if no customer is waiting', async () => {
            await expect(service.callCustomer(5)).rejects.toThrow(InvalidCounterStateError);
        });
    })
});





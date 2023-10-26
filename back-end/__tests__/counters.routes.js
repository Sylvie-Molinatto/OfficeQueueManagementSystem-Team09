require('jest');
const request = require("supertest");
const app = require('../app');
const service = require('../src/services/counters');
const { UnknownServiceOfficeError } = require("../src/errors/UnknownServiceOfficeError");
const { UnknownCounterError } = require("../src/errors/UnknownCounterError");

jest.mock('../src/services/counters', () => ({
    list: jest.fn(),
    getCounterById: jest.fn(),
    indicateTicketAsServed: jest.fn(),
    callCustomer: jest.fn()
}));

describe('[ROUTES] Counters', () => {
    afterAll(() => {
        jest.resetAllMocks();
    });

    describe('GET /api/counters', () => {
        test('should return the list of counters', async () => {
            service.list.mockResolvedValue([
                {
                    id: 1,
                    available: true
                },
                {
                    id: 2,
                    available: false
                }
            ]);

            const res = await request(app).get('/api/counters');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual([
                {
                    id: 1,
                    available: true
                },
                {
                    id: 2,
                    available: false
                }
            ]);
        });

        test('should return an empty list if no counter', async () => {
            service.list.mockResolvedValue([]);

            const res = await request(app).get('/api/counters');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual([]);
        });

        test('should handle unknown errors thrown by the service', async () => {
            service.list.mockRejectedValue(new Error('Something went wrong'));

            const res = await request(app).get('/api/counters');

            expect(res.statusCode).toEqual(500);
            expect(res.body).toEqual({
                message: 'Internal server error'
            });
        });
    });

    describe('GET /api/counters/:id', () => {
        test('should return the counter with the given id', async () => {
            service.getCounterById.mockResolvedValue({
                id: 1,
                available: true,
                currentTicket: null,
                services: [{ code: 'A01', name: 'Service A01'}]
            });

            const res = await request(app).get('/api/counters/1');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({
                id: 1,
                available: true,
                currentTicket: null,
                services: [{ code: 'A01', name: 'Service A01'}]
            });
            expect(service.getCounterById).toHaveBeenCalledWith(1);
        });

        test('should return 404 if ID is not a number', async () => {
            const ID = 'abc';
            const res = await request(app).get(`/api/counters/${ID}`);

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual(new UnknownCounterError(ID).toJSON());
        });

        test('should return 404 error while counter id is not found', async () => {
            const err = new UnknownServiceOfficeError(2);
            service.getCounterById.mockRejectedValue(err);

            const res = await request(app).get('/api/counters/2');

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual(err.toJSON());
            expect(service.getCounterById).toHaveBeenCalledWith(2);
        });

        test('should handle unknown errors thrown by the service', async () => {
            service.getCounterById.mockRejectedValue(new Error('Something went wrong'));

            const res = await request(app).get('/api/counters/1');

            expect(res.statusCode).toEqual(500);
            expect(res.body).toEqual({
                message: 'Internal server error'
            });
        });
    });

    describe('POST /api/counters/:id/ticket-served', () => {
        test('should return the ticket with the given id', async () => {
            const ID = 1;
            service.indicateTicketAsServed.mockResolvedValue({
                id: 12,
                service_code: 'A01',
                creation_date: '2021-01-01T00:00:00.000Z',
                counter_id: 1,
                serving_date: '2021-01-01T00:00:00.000Z',
                completion_date: null,
            });

            const res = await request(app).post(`/api/counters/${ID}/ticket-served`);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({
                id: 12,
                serviceCode: 'A01',
                creationDate: '2021-01-01T00:00:00.000Z',
                counterId: ID,
                servingDate: '2021-01-01T00:00:00.000Z',
                completionDate: null,
            });
            expect(service.indicateTicketAsServed).toHaveBeenCalledWith(ID);
        });

        test('should return 404 if ID is not a number', async () => {
            const ID = 'abc';
            const res = await request(app).post(`/api/counters/${ID}/ticket-served`);

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual(new UnknownCounterError(ID).toJSON());
        });

        test('should return 404 error while counter id is not found', async () => {
            const ID = 2;
            const err = new UnknownCounterError(ID);
            service.indicateTicketAsServed.mockRejectedValue(err);

            const res = await request(app).post(`/api/counters/${ID}/ticket-served`);

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual(err.toJSON());
            expect(service.indicateTicketAsServed).toHaveBeenCalledWith(ID);
        });

        test('should handle unknown errors thrown by the service', async () => {
            service.indicateTicketAsServed.mockRejectedValue(new Error('Something went wrong'));

            const res = await request(app).post('/api/counters/1/ticket-served');

            expect(res.statusCode).toEqual(500);
            expect(res.body).toEqual({
                message: 'Internal server error'
            });
        });
    });

    describe('POST /api/counters/:id/request-customer', () => {
        test('should return the ticket with the given id', async () => {
            const ticketID = 1;
            const counterID = 12;
            service.callCustomer.mockResolvedValue({
                id: ticketID,
                service_code: 'A01',
                creation_date: '2021-01-01T00:00:00.000Z',
                counter_id: counterID,
                serving_date: null,
                completion_date: null,
            });

            const res = await request(app).post(`/api/counters/${counterID}/request-customer`);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({
                id: ticketID,
                serviceCode: 'A01',
                creationDate: '2021-01-01T00:00:00.000Z',
                counterId: counterID,
                servingDate: null,
                completionDate: null,
            });
            expect(service.callCustomer).toHaveBeenCalledWith(counterID);
        });

        test('should return 404 if ID is not a number', async () => {
            const ID = 'abc';
            const res = await request(app).post(`/api/counters/${ID}/request-customer`);

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual(new UnknownCounterError(ID).toJSON());
        });

        test('should return 404 error while counter id is not found', async () => {
            const ID = 2;
            const err = new UnknownCounterError(ID);
            service.callCustomer.mockRejectedValue(err);

            const res = await request(app).post(`/api/counters/${ID}/request-customer`);

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual(err.toJSON());
            expect(service.callCustomer).toHaveBeenCalledWith(ID);
        });

        test('should handle unknown errors thrown by the service', async () => {
            service.callCustomer.mockRejectedValue(new Error('Something went wrong'));

            const res = await request(app).post('/api/counters/1/request-customer');

            expect(res.statusCode).toEqual(500);
            expect(res.body).toEqual({
                message: 'Internal server error'
            });
        });
    });
});

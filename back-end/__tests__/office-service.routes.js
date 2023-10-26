require('jest');
const request = require("supertest");
const app = require('../app');
const service = require('../src/services/office-queue');
const { UnknownServiceOfficeError } = require("../src/errors/UnknownServiceOfficeError");

jest.mock('../src/services/office-queue', () => ({
    addTicketToQueue: jest.fn(),
}));

describe('[ROUTES] Office services', () => {
    afterAll(() => {
        jest.resetAllMocks();
    });

    describe('POST /api/services/:code/queue', () => {
        test('should return the formatted ticket while request success', async () => {
            service.addTicketToQueue.mockResolvedValue({
                id: 1,
                service_code: 'A01',
                creation_date: '2021-01-01T00:00:00.000Z',
                counter_id: null,
                serving_date: null,
                completion_date: null,
            });

            const res = await request(app).post('/api/services/A01/queue');

            expect(res.statusCode).toEqual(201);
            expect(res.body).toEqual({
                id: 1,
                serviceCode: 'A01',
                creationDate: '2021-01-01T00:00:00.000Z',
                counterId: null,
                servingDate: null,
                completionDate: null
            });
            expect(service.addTicketToQueue).toHaveBeenCalledWith('A01');
        });

        test('should return 404 error while service code is not found', async () => {
            service.addTicketToQueue.mockRejectedValue(new UnknownServiceOfficeError('A02'));

            const res = await request(app).post('/api/services/A02/queue');

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual({
                message: 'The service "A02" targeted by the request is unknown.',
            });
            expect(service.addTicketToQueue).toHaveBeenCalledWith('A02');
        });
    });
});

require('jest');
const request = require("supertest");
const app = require('../server');

describe('[ROUTES] Dummy test', () => {
    test('should return 200 with "Hello World!" message', async () => {
        const res = await request(app).get('/api/dummy/hello');

        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('Hello World!');
    })
});

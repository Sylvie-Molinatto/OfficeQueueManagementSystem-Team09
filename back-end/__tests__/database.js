require('jest');
const db = require('../src/services/db');

describe('[DATABASE] Check database access using SQLite3', () => {
    test('should return the list of counters', async () => {
        const rows = await db.prepare('SELECT * FROM counters').all();

        expect(rows.length).toBeGreaterThan(0);
        for (const row of rows) {
            expect(row).toHaveProperty('id');
            expect(row).toHaveProperty('available');
        }
    });

    test('should return the list of services', async () => {
        const rows = await db.prepare('SELECT * FROM services').all();

        expect(rows.length).toBeGreaterThan(0);
        for (const row of rows) {
            expect(row).toHaveProperty('code');
            expect(row).toHaveProperty('label');
        }
    });
});

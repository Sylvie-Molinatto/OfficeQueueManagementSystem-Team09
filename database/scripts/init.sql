/* Create tables */
DROP TABLE IF EXISTS counters;
CREATE TABLE counters (
                         id INTEGER PRIMARY KEY AUTOINCREMENT,
                         available INTEGER NOT NULL DEFAULT 0
);

DROP TABLE IF EXISTS services;
CREATE TABLE services (
                         code TEXT PRIMARY KEY,
                         label TEXT NOT NULL,
                         description TEXT NOT NULL DEFAULT ''
);

DROP TABLE IF EXISTS counters_services;
CREATE TABLE counters_services (
                                 counter_id INTEGER NOT NULL,
                                 service_code TEXT NOT NULL,
                                 PRIMARY KEY (counter_id, service_code),
                                 FOREIGN KEY (counter_id) REFERENCES counters (id),
                                 FOREIGN KEY (service_code) REFERENCES services (code)
);

DROP TABLE IF EXISTS tickets;
CREATE TABLE tickets (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        service_code TEXT NOT NULL,
                        creation_date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        counter_id INTEGER,
                        serving_date TEXT,
                        completion_date TEXT,
                        FOREIGN KEY (service_code) REFERENCES services (code),
                        FOREIGN KEY (counter_id) REFERENCES counters (id)
);

/* Insert data */
/* COUNTERS */
INSERT INTO counters (available) VALUES (1);
INSERT INTO counters (available) VALUES (1);
INSERT INTO counters (available) VALUES (1);
INSERT INTO counters (available) VALUES (1);
INSERT INTO counters (available) VALUES (1);
INSERT INTO counters (available) VALUES (1);
INSERT INTO counters (available) VALUES (1);
/* SERVICES */
INSERT INTO services (code, label) VALUES ('A01', 'Service A01');
INSERT INTO services (code, label) VALUES ('A02', 'Service A02');
INSERT INTO services (code, label) VALUES ('A03', 'Service A03');
INSERT INTO services (code, label) VALUES ('A04', 'Service A04');
INSERT INTO services (code, label) VALUES ('A05', 'Service A05');
/* COUNTER_SERVICES */
INSERT INTO counters_services (counter_id, service_code) VALUES (1, 'A01');
INSERT INTO counters_services (counter_id, service_code) VALUES (1, 'A02');
INSERT INTO counters_services (counter_id, service_code) VALUES (1, 'A03');
INSERT INTO counters_services (counter_id, service_code) VALUES (2, 'A01');
INSERT INTO counters_services (counter_id, service_code) VALUES (3, 'A02');
INSERT INTO counters_services (counter_id, service_code) VALUES (3, 'A04');
INSERT INTO counters_services (counter_id, service_code) VALUES (4, 'A01');
INSERT INTO counters_services (counter_id, service_code) VALUES (4, 'A05');
INSERT INTO counters_services (counter_id, service_code) VALUES (5, 'A05');
INSERT INTO counters_services (counter_id, service_code) VALUES (6, 'A01');
INSERT INTO counters_services (counter_id, service_code) VALUES (6, 'A03');
INSERT INTO counters_services (counter_id, service_code) VALUES (7, 'A04');

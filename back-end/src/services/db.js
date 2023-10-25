const betterSqlite3 = require('better-sqlite3');
const path = require("path");

const PATH_DB = path.join(__dirname, "../../../database/db.sqlite");
const options = {
    fileMustExist: true,
    verbose: console.log
};

const db = betterSqlite3(PATH_DB, options);

module.exports = db;

/**
 * @typedef {Object} InsertQueryResult
 *
 * @property {number} lastInsertRowid The last inserted row id
 * @property {number} changes The number of rows affected by the query
 */

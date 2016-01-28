"use strict";
var mysql = require('mysql');
var async = require('async');
var _ = require('lodash');
var fixture = require('./fixture.json');
var connection = require('./connection.json')[process.env.NODE_ENV];
var pool = null;

exports.connect = function (done) {
    pool = mysql.createPool({
        host: connection.host,
        user: connection.user,
        password: connection.password,
        database: connection.database
    });
    done();
};

function get(done) {
    // Get pool
    if (!pool) return done(new Error('Missing database connection.'));
    pool.getConnection((err, connection) => {
        if (err) return done(err);
        done(err, connection);
    });
}

exports.get = get;

exports.createSchema = function (done) {
    dropAllTables(err=> {
        if (err) return done(err);
        createAllTables(err => {
            done(err);
        });
    });
};

function dropAllTables(done) {
    get((err, connection) => {
        async.each(fixture.tables, (table, callback) => {
            // Turn off session foreign_key_checks
            connection.query("SET FOREIGN_KEY_CHECKS = 0;", (err, _) => {
                // Drop table
                connection.query(`DROP TABLE IF EXISTS ${table.tableName};`, (err, _) => {
                    callback(err);
                });
            });
        }, err => {
            connection.destroy();
            done(err);
        });
    });
}

function createAllTables(done) {
    get((err, connection) => {
        async.each(fixture.tables, (table, callback) => {
            // Create table
            connection.query(table.schema.join(""), (err, _) => {
                callback(err);
            });
        }, err => {
            connection.destroy();
            done(err);
        });
    });
}

exports.fixtures = function (done) {
    dropAllTables(err=> {
        if (err) return done(err);
        createAllTables(err => {
            if (err) return done(err);
            insertAllTables(err => {
                done(err);
            });
        });
    });
};

function insertAllTables(done) {
    get((err, connection) => {
        async.each(fixture.tables, (table, callback) => {
            async.each(table.data, (row, rowInserted) => {
                let columns = _.keys(row);
                let values = _.values(row);
                connection.query(`INSERT INTO ${table.tableName} ( ${columns.join(',')} ) VALUES ( ${join(values)});`, (err, result) => {
                    rowInserted(err);
                });
            }, err => {
                callback(err);
            });
        }, err => {
            connection.destroy();
            done(err);
        });
    });
}

// Constructs a values string for query calls.
// Currently only wrapping string values with quotes.
function join(data) {
    var joined = [];
    _.forEach(data, (item) => {
        if (typeof item === 'string') {
            joined.push(`'${item}'`);
        } else {
            joined.push(item);
        }
    });
    return joined.join(',');
}
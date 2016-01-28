'use strict';
var db = require('../db.js');
var Customer = require('../models/customer');

// Table Name
var TABLE_NAME = 'customer';
// Column Names
var ID = 'id';
var FIRST_NAME = 'firstName';
var LAST_NAME = 'lastName';
var DOB = 'dob';

exports.create = function(customer, done) {
    var values = [customer.getFirstName(), customer.getLastName(), customer.getDOB()];
    db.get((err, connection) => {
        if (err) return done(err);
        connection.query(`INSERT INTO ${TABLE_NAME} (${FIRST_NAME}, ${LAST_NAME}, ${DOB}) VALUES(?, ?, ?)`, values, (err, result) => {
            if (err) return done(err);
            connection.destroy();
            done(null, result);
        });
    });
};

exports.findCustomerById = function(id, done) {
    db.get((err, connection) => {
        if (err) return done(err);
        connection.query(`SELECT * FROM ${TABLE_NAME} WHERE id = ?`, id, (err, rows) => {
            if (err) return done(err);
            connection.destroy();
            done(null, Customer.rowToCustomer(rows[0]));
        });
    });
};

exports.findAll = function(done) {
    db.get((err, connection) => {
        if (err) return done(err);
        connection.query(`SELECT * FROM ${TABLE_NAME}`, (err, rows) => {
            if (err) return done(err);
            connection.destroy();
            done(null, Customer.rowsToCustomers(rows));
        });
    });
};

exports.update = function(customer, done) {
    var values = [customer.getFirstName(), customer.getLastName(), customer.getDOB(), customer.getId()];
    db.get((err, connection) => {
        if (err) return done(err);
        connection.query(`UPDATE ${TABLE_NAME} SET ${FIRST_NAME} = ?, ${LAST_NAME} = ?, ${DOB} = ? WHERE ${ID} = ?`, values, (err, result) => {
            if (err) return done(err);
            connection.destroy();
            done(null, result);
        });
    });
};

exports.delete = function(id, done) {
    db.get((err, connection) => {
        if (err) return done(err);
        connection.query(`DELETE FROM ${TABLE_NAME} WHERE ${ID} = ?`, id, (err, result) => {
            if (err) return done(err);
            connection.destroy();
            done(null, result);
        });
    });
};


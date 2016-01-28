'use strict';
var db = require('../db.js');
var Address = require('../models/address');

// Table Name
var TABLE_NAME = 'address';
// Column Names
var ID = 'id';
var ADDRESSLINE1 = 'addressLine1';
var TOWN = 'town';
var CUSTOMERID = 'customerId';

exports.create = function (address, done) {
    var values = [address.getAddressLine1(), address.getTown(), address.getCustomerId()];
    db.get((err, connection) => {
        if (err) return done(err);
        connection.query(`INSERT INTO ${TABLE_NAME} (${ADDRESSLINE1}, ${TOWN}, ${CUSTOMERID}) VALUES(?, ?, ?)`, values, (err, result) => {
            if (err) return done(err);
            connection.destroy();
            done(null, result);
        });
    });
};

exports.findAddressesByCustomerId = function (id, done) {
    db.get((err, connection) => {
        if (err) return done(err);
        connection.query(`SELECT * FROM ${TABLE_NAME} WHERE ${CUSTOMERID} = ?`, id, (err, rows) => {
            if (err) return done(err);
            connection.destroy();
            done(null, Address.rowsToAddresses(rows));
        });
    });
};

exports.update = function (address, done) {
    var values = [address.getAddressLine1(), address.getTown(), address.getCustomerId(), address.getId()];
    db.get((err, connection) => {
        if (err) return done(err);
        connection.query(`UPDATE ${TABLE_NAME} SET ${ADDRESSLINE1} = ?, ${TOWN} = ?, ${CUSTOMERID} = ? WHERE ${ID} = ?`, values, (err, result) => {
            if (err) return done(err);
            connection.destroy();
            done(null, result);
        });
    });
};

exports.delete = function (id, done) {
    db.get((err, connection) => {
        if (err) return done(err);
        connection.query(`DELETE FROM ${TABLE_NAME} WHERE ${ID} = ?`, id, (err, result) => {
            if (err) return done(err);
            connection.destroy();
            done(null, result);
        });
    });
};
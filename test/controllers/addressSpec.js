"use strict";
process.env.NODE_ENV = 'development';
var assert = require('assert');
var address = require('../../controllers/address');
var Address = require('../../models/address');
var db = require('../../db');

describe('Address Controller', () => {
    
    // Before all tests
    before(function (done) {
        db.connect(err => {
            if (err) {
                console.log('Unable to connect to MySQL.');
            } else {
                db.createSchema(done);
            }
        });
    });

    // Before each test
    beforeEach(function (done) {
        db.fixtures(done);
    });

    it('should create a valid address', (done) => {
        address.create(new Address(1, '10 High Street', 'Swindon', 1), (err, result) => {
            if (err) return done(err);
            assert.ok(result.insertId > 0);
            done();
        });
    });

    it('should find an address by customerId', (done) => {
        address.findAddressesByCustomerId(1, (err, addresses) => {
            if (err) return done(err);
            assert.equal(addresses[0].getId(), 1);
            done();
        });
    });

    it('should update an address', (done) => {
        address.update(new Address(1, '10 High Street', 'London', 1), (err, result) => {
            if (err) return done(err);
            assert.equal(result.changedRows, 1);
            done();
        });
    });

    it('should delete an address', (done) => {
        address.delete(2, (err, result) => {
            if (err) return done(err);
            assert.equal(result.affectedRows, 1);
            done();
        });
    });
});




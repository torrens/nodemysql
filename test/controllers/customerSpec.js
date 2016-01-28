"use strict";
process.env.NODE_ENV = 'development';
var assert = require('assert');
var customer = require('../../controllers/customer');
var Customer = require('../../models/customer');
var db = require('../../db');

describe('Customer Controller', () => {

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

    it('should create a valid customer', (done) => {
        customer.create(new Customer(1, 'Scooby', 'Doo', '2015-03-25T12:00:00'), (err, result) => {
            if (err) return done(err);
            assert.ok(result.insertId > 0);
            done();
        });
    });

    it('should find a customer by id', (done) => {
        customer.findCustomerById(1, (err, customer) => {
            if (err) return done(err);
            assert.equal(customer.getId(), 1);
            done();
        });
    });

    it('should find all customers', (done) => {
        customer.findAll((err, customers) => {
            if (err) return done(err);
            assert.ok(customers.length > 0);
            done();
        });
    });

    it('should update a customer', (done) => {
        customer.update(new Customer(1, 'Scooby2', 'Doo2', '2015-03-25T12:00:00'), (err, result) => {
            if (err) return done(err);
            assert.equal(result.changedRows, 1);
            done();
        });
    });

    it('should delete a customer', (done) => {
        customer.delete(3, (err, result) => {
            if (err) return done(err);
            assert.equal(result.affectedRows, 1);
            done();
        });
    });
});




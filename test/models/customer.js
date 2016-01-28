"use strict";
process.env.NODE_ENV = 'development';
var assert = require('assert');
var Customer = require('../../models/customer');

describe('Customer Model', () => {

    it('should construct a customer', () => {
        var customer = new Customer(1, 'Scooby', 'Doo', '2015-03-25T12:00:00');
        assert.equal(customer.getId(), 1);
        assert.equal(customer.getFirstName(), 'Scooby');
        assert.equal(customer.getLastName(), 'Doo');
        assert.equal(customer.getDOB(), '2015-03-25T12:00:00');
    });

    it('should generate accurate json', () => {
        var customer = new Customer(1, 'Scooby', 'Doo', '2015-03-25T12:00:00');
        var customerJson = customer.toJson();
        assert.equal(customerJson.id, 1);
        assert.equal(customerJson.firstName, 'Scooby');
        assert.equal(customerJson.lastName, 'Doo');
        assert.equal(customerJson.dob, '2015-03-25T12:00:00');
    });
});

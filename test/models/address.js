"use strict";
process.env.NODE_ENV = 'development';
var assert = require('assert');
var Address = require('../../models/address');

describe('Customer Model', () => {

    it('should construct an address', () => {
        var address = new Address(1, '10 High Street', 'Swindon', 1);
        assert.equal(address.getId(), 1);
        assert.equal(address.getAddressLine1(), '10 High Street');
        assert.equal(address.getTown(), 'Swindon');
        assert.equal(address.getCustomerId(), 1);
    });

    it('should generate accurate json', () => {
        var address = new Address(1, '10 High Street', 'Swindon', 1);
        var addressJson = address.toJson();
        assert.equal(addressJson.id, 1);
        assert.equal(addressJson.addressLine1, '10 High Street');
        assert.equal(addressJson.town, 'Swindon');
        assert.equal(addressJson.customerId, 1);
    });
});

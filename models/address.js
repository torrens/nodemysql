'use strict';
var _ = require('lodash');

class Address {
    constructor(id, addressLine1, town, customerId) {
        this.id = id;
        this.addressLine1 = addressLine1;
        this.town = town;
        this.customerId = customerId;
    }

    static rowToAddress(row) {
        return new Address(row.id, row.addressLine1, row.town, row.customerId);
    }

    static rowsToAddresses(rows) {
        var addresses = [];
        _.forEach(rows, (row) => {
            addresses.push(this.rowToAddress(row));
        });
        return addresses;
    }

    toJson() {
        return {
            'id': this.id,
            'addressLine1': this.addressLine1,
            'town': this.town,
            'customerId': this.customerId };
    }

    getId() {
        return this.id;
    }

    getAddressLine1() {
        return this.addressLine1;
    }

    getTown() {
        return this.town;
    }

    getCustomerId() {
        return this.customerId;
    }
}

module.exports = Address;
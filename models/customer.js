'use strict';
var _ = require('lodash');

class Customer {
    constructor(id, firstName, lastName, dob) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
    }

    static rowToCustomer(row) {
        return new Customer(row.id, row.firstName, row.lastName, row.dob);
    }

    static rowsToCustomers(rows) {
        var customers = [];
        _.forEach(rows, (row) => {
           customers.push(this.rowToCustomer(row));
        });
        return customers;
    }

    toJson() {
        return {
            'id': this.id,
            'firstName': this.firstName,
            'lastName': this.lastName,
            'dob': this.dob };
    }

    getId() {
        return this.id;
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getDOB() {
        return this.dob;
    }
}

module.exports = Customer;
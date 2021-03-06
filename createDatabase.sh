#!/usr/bin/env bash

MYSQL=`which mysql`
DATABASE_NAME="mysqldemo_dev"
USER_NAME="testuser"

# Create Database
CREATE_DB="DROP DATABASE IF EXISTS $DATABASE_NAME;
    CREATE DATABASE IF NOT EXISTS $DATABASE_NAME;"
$MYSQL -uroot -e "$CREATE_DB"

# Create User
CREATE_USER="GRANT USAGE ON *.* TO $USER_NAME@localhost IDENTIFIED BY 'password';
    GRANT ALL PRIVILEGES ON $DATABASE_NAME.* TO $USER_NAME@localhost;FLUSH PRIVILEGES;"
$MYSQL -uroot -e "$CREATE_USER"


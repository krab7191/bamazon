//jshint esversion: 6

// Import modules
var sql = require("mysql");
var iq = require("inquirer");
var sqlTab = require("cli-table");

// connect to the database
var conn = sql.createConnection({
    host: 'localhost',
    user: 'karsten',
    password: 'cheese',
    database: 'bamazon'
});

conn.connect();
const  mysql = require('mysql');

const config =mysql.createConnection( {
    host: "localhost",
    user: "root",
    password: "",
    database: "tagme" 
});

module.exports = config;



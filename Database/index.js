const query = require('mysql');

const connection = query.createConnection({
    host: 'localhost',
    user: 'hilmi',
    password: 'Hilmi12345',
    database: 'internsarenone',
    port: 3306,
    multipleStatements: true
})

module.exports = connection;
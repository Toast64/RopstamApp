const mysql = require('mysql');

const connection = mysql.createConnection({
  
  timezone: 'UTC',
  dateStrings: [
      'DATE',
      'DATETIME'
  ],

  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD || '',
  database: process.env.DATABASE || 'rtestingdb',
  multipleStatements: true
});

module.exports = connection;
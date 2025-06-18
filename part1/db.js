const mysql =require('mysql2/promise');

const db = mysql.createPool({
  socketpath: '/var'
  host: '127.0.0.1',
  user: 'root',
  password: 'mypassword',
  database: 'testbook_marketplace'
});

module.exports = db;
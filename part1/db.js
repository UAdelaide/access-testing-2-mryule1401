const mysql =require('mysql2/promise');

const db = mysql.createPool({
  socketpath: '/var/run/mysqld/mysqld.sock',
  host: 'localhost',
  user: 'root',
  password: 'mypassword',
  database: 'textbook_marketplace'
});

module.exports = db;
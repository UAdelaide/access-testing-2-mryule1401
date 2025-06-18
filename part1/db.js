const mysql =require('mysql2/promise');

const db = mysql.createPool({
  socketpath: '/var/run/mysqld/mysqld.sock',
  host: '127.0.0.1',
  user: 'root',
  password: 'mypassword',
  database: 'textbook_marketplace'
});

module.exports = db;
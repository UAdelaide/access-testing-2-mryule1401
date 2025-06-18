const mysql =require('mysql2/promise');
const { router } = require('./app');

const db = mysql.createPool({
  socketPath: '/var/run/mysqld/mysqld.sock',
  host: 'localhost',
  user: 'root',
  password: 'mypassword',
  database: 'textbook_marketplace'
});

router.post('/messages', async function(req, res) {
    const { itemId, message } = req.body;
module.exports = db;
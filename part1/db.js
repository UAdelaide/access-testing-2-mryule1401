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
    const { bookID, message } = req.body;
    await db.query(`
        INSERT INTO Messages (BuyerID, SellerID, BookID, MessageText,SentAt)
        VALUES (?, ?, ?, ?, NOW())
    `, [CURRENT_BUYER_ID, CURRENT_SELLER_ID, bookID, message]);
    res.status(201).json({ message: 'Message sent successfully' });
});
module.exports = db;
var express = require('express');
var router = express.Router();
var db = require('../db');

var CURRENT_BUYER_ID =1;
var CURRENT_SELLER_ID =2;

router.get('/items', async function(req, res) {
const [rows] = await db.query(`
    SELECT bl.BookID, b.Title, b.Author, u.Name AS SellerName, bl.
    FROM BookListings bl
    JOIN BookInfo b ON bl.BookInfoID = b.BookInfoID
    JOIN Users u ON bl.SellerID = u.UserID
`);
res.json(rows);
});
router.post('/messages', async function(req, res) {
    const { bookID, message } = req.body;
    await db.query(`
        INSERT INTO Messages (BuyerID, SellerID, BookID, MessageText,SentAt)
        VALUES (?, ?, ?, ?, NOW())
    `, [CURRENT_BUYER_ID, CURRENT_SELLER_ID, bookID, message]);
    res.status(201).json({ message: 'Message sent successfully' });
});
module.exports = router;
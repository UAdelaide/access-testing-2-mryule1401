var express = require('express');
var router = express.Router();
var db = require('../db');

var CURRENT_BUYER_ID =1;
var CURRENT_SELLER_ID =2;

router.get('/items', async function(req, res) {
const [rows] = await db.query(`
    SELECT bl.BookID, b.Title, b.Author, u.Name AS SellerName, bl.SellerID
    FROM BookListings bl
    JOIN BookInfo b ON bl.BookInfoID = b.BookInfoID
    JOIN Users u ON bl.SellerID = u.UserID
`);
res.json(rows);
});

router.get('/messages', async (req, res) => {
  const [rows] = await db.query(`
    SELECT m.MessageText, m.SentAt, bi.Title, u.Name AS BuyerName
    FROM Messages m
    JOIN BookListings bl ON m.BookID = bl.BookID
    JOIN BookInfo bi ON bl.BookInfoID = bi.BookInfoID
    JOIN Users u ON m.BuyerID = u.UserID
    WHERE m.SellerID = ?
    ORDER BY m.SentAt DESC
  `, [CURRENT_BUYER_ID]);
  res.json(rows);
});

router.post('/messages', async function(req, res) {
    const { bookID,sellerID, message } = req.body;
    await db.query(`
        INSERT INTO Messages (BuyerID, SellerID, BookID, MessageText,SentAt)
        VALUES (?, ?, ?, ?, NOW())
    `, [CURRENT_BUYER_ID, sellerID, bookID, message]);
    res.status(201).json({ message: 'Message sent successfully' });
});
module.exports = router;
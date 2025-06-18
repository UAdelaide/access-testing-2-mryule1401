var express = require('express');
var router = express.Router();
var db = require('../db');

var CURRENT_BUYER_ID =1;
var CURRENT_SELLER_ID =2;

router.get('/items', async function(req, res) {
    const [rows] =await db.query(`
        SELECT bl.BookID,  bl.Title, b.Author, u.Name AS SellerName, b.Price
        FROM BookListings bl`)
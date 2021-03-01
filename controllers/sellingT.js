const express = require("express");
const pool = require("../db");

// insert the transaction into the the db 
exports.insertSellT = async (req, res, next) => {
    const user_id = req.user;
    var {stock_symbol, qty, date} = req.body;
    const stock_rate_id = req.stock_rate_id;
    qty = Math.abs(qty) * -1;

    try {
        let transInfo = await pool.query(
            "INSERT INTO transactions (user_id, stock_symbol, transaction_stock_rate_id, transaction_date, transaction_type, transaction_qty) VALUES ($1, $2, $3, $4, 'sell', $5) RETURNING *;",
            [user_id, stock_symbol, stock_rate_id, date, qty]
        );

        console.log(transInfo.rows[0]);
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

}
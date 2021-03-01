const express = require("express");
const pool = require("../db");

// get the stock_rate_id and eod price
exports.getSriEod = async(req, res, next) =>{
    const {stock_symbol, qty, date} = req.body;
    try {
        const nse_st = await pool.query(
            "SELECT stock_rate_id, eod_price FROM nse_stocks_rate WHERE stock_symbol = $1 AND on_date = $2",
            [stock_symbol, date]);

        if (nse_st.rows.length === 0) {
            return res.json("Stock does not exist");
            }

        const {stock_rate_id, eod_price} = nse_st.rows[0];
        
        req.stock_rate_id = stock_rate_id;

        next();

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

// insert the transaction into the the db 
exports.insertBuyT = async (req, res, next) => {
    const user_id = req.user;
    const {stock_symbol, qty, date} = req.body;
    const stock_rate_id = req.stock_rate_id;

    try {
        let transInfo = await pool.query(
            "INSERT INTO transactions (user_id, stock_symbol, transaction_stock_rate_id, transaction_date, transaction_type, transaction_qty) VALUES ($1, $2, $3, $4, 'buy', $5) RETURNING *;",
            [user_id, stock_symbol, stock_rate_id, date, qty]
        );

        console.log(transInfo.rows[0]);
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

}
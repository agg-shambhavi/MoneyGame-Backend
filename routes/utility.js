const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/stock_price", async (req, res) => {
    try {
        const { stock_symbol, date } = req.body;
        const user = await pool.query(
        "select eod_price from nse_stocks_rate where stock_symbol = $1 and on_date = $2;",
        [stock_symbol, date] 
        ); 

        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
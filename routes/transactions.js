const express = require("express");
const router = express.Router();
const pool = require("../db");
const {getSriEod, insertBuyT} = require("../controllers/buyingT");
const {insertSellT} = require("../controllers/sellingT");
const authorize = require("../middleware/authorize");

router.post("/buy",authorize, getSriEod, insertBuyT, async(req, res) =>{
    try {
        res.status(200).json("Successful");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

router.post("/sell",authorize, getSriEod, insertSellT, async(req, res) =>{
    try {
        res.status(200).json("Successful");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

router.get("/all",authorize,  async(req, res) =>{
    try {
        const user_id = req.user;
        var allTrans = await pool.query(
            "Select t.stock_symbol, ns.stock_name, t.transaction_date, t.transaction_type, ABS(t.transaction_qty), nsr.eod_price FROM transactions as t LEFT  OUTER  JOIN nse_stocks_rate as nsr ON t.transaction_stock_rate_id = nsr.stock_rate_id LEFT  OUTER  JOIN nse_stocks as ns ON t.stock_symbol = ns.stock_symbol WHERE t.user_id = $1;",
            [user_id]
        );

        if (allTrans.rows.length === 0){
            return res.status(401).json("No transactions found");
        }

        // const output = [];

        // for (let i = 0; i < allTrans.rows.length; i++){
        //     output.push(allTrans.rows.rows[i]);
        // }

        // console.log(output);

        res.status(200).json(allTrans.rows);
        

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

module.exports = router;
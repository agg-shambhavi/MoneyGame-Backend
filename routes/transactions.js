const express = require("express");
const router = express.Router();
const pool = require("../db");
const {getSriEod, insertBuyT} = require("../controllers/buyingT");
const authorize = require("../middleware/authorize");

router.post("/buy",authorize, getSriEod, insertBuyT, async(req, res) =>{
    try {
        res.json(req.stock_rate_id);
        

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

module.exports = router;
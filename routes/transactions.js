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



module.exports = router;
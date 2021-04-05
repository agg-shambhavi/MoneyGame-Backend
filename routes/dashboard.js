const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

router.get("/userinfo", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT first_name, last_name, registration_date, user_email FROM users WHERE user_id = $1",
      [req.user] 
    ); 
    
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/portfolio", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "select  p.stock_symbol, p.qty ,r.eod_price from (select stock_symbol, sum(transaction_qty) as qty from transactions where transactions.user_id = $1 group by stock_symbol ) as p left join (select eod_price, stock_symbol, on_date from nse_stocks_rate where on_date = '2021-02-18') as r on p.stock_symbol=r.stock_symbol;",
      [req.user] 
    ); 
    
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/sell-stocks", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "select stock_symbol from transactions where transactions.user_id = $1 group by stock_symbol;",
      [req.user] 
    ); 
    
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
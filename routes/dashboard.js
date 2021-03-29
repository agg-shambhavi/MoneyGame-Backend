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

module.exports = router;
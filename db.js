const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "aggarwal",
  port: 5432,
  database: "moneygame"
});

module.exports = pool;

const { Pool } = require('pg');

// Replace with your actual DB credentials
const pool = new Pool({
  user: 'your_user',
  host: 'localhost',
  database: 'your_db',
  password: 'your_password',
  port: 5432,
});

module.exports = pool;

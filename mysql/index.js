require('dotenv').config();
const mysql = require('mysql2');

// Connection
const connection = mysql.createConnection({
  host: process.env.RAILWAY_TCP_PROXY_DOMAIN,
  port: process.env.RAILWAY_TCP_PROXY_PORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// Connect
connection.connect((err) => {
  if (err) {
    return console.error('❌ Connection error:', err.message);
  }
  console.log('✅ Connected to Railway MySQL!');

  // Step 1: Create table
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255),
      email VARCHAR(255)
    );
  `;

  connection.query(createTableQuery, (err) => {
    if (err) throw err;
    console.log('✅ Table created.');

    // Step 2: Insert dummy data
    const insertDataQuery = `
      INSERT INTO users (name, email)
      VALUES ('Alice', 'alice@example.com'), ('Bob', 'bob@example.com');
    `;

    connection.query(insertDataQuery, (err) => {
      if (err) throw err;
      console.log('✅ Dummy data inserted.');

      // Step 3: Select and display data
      connection.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        console.log('📦 Users:', results);
        connection.end();
      });
    });
  });
});

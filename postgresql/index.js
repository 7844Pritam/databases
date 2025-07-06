const { Pool } = require('pg');

// PostgreSQL pool connection
const pool = new Pool({
  user: 'postgres',
  host: 'db.ticbysrzzobfcfreakdf.supabase.co',
  database: 'postgres',
  password: 'qe5DbH6d5fZrcsb4',
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // Supabase requires SSL
  },
});

async function main() {
  try {
    // 1. Create the users table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
      );
    `);
    console.log('✅ Table created or already exists');

    // 2. Dummy user data
    const users = [
      ['Alice', 'alice@supabase.com'],
      ['Bob', 'bob@supabase.com'],
      ['Charlie', 'charlie@supabase.com'],
    ];

    // 3. Insert each user (skip if email already exists)
    for (const [name, email] of users) {
      await pool.query(
        `INSERT INTO users (name, email) 
         VALUES ($1, $2) 
         ON CONFLICT (email) DO NOTHING`,
        [name, email]
      );
    }
    console.log('✅ Dummy users inserted');

    // 4. Fetch all users
    const result = await pool.query('SELECT * FROM users');
    console.log('📦 Users in database:', result.rows);
  } catch (err) {
    console.error('❌ Error with Supabase DB:', err);
  } finally {
    await pool.end(); // clean shutdown
  }
}

main();

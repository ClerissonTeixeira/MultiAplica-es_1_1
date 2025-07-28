import {Pool} from 'pg';

// Configure your database connection
const pool = new Pool({
  user: 'neondb',
  host: 'ep-dry-band-ackstshb-pooler.sa-east-1.aws.neon.tech',
  database: 'neondb_owner',
  password: 'npg_gW6x3dabMFrw',
  port: 5432, // Default PostgreSQL port
  ssl: {
    rejectUnauthorized: false // Use this if you encounter SSL issues, but be cautious in production
  }
});

async function addTaskToDatabase(title, done = false) {
  try {
    const res = await pool.query(
      'INSERT INTO tasks (titulo, done) VALUES ($1, $2) RETURNING *',
      [title, done]
    );
    console.log('Task added:', res.rows[0]);
  } catch (err) {
    console.error('Error adding task:', err);
  } finally {
    // await pool.end(); // Don't end the pool if you want to reuse connections
  }
}

// Example usage:
addTaskToDatabase('Estudar React');
addTaskToDatabase('Fazer compras', true);
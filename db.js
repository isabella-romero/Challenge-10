const { Client } = require('pg');

// Set up PostgreSQL client
const client = new Client({
  host: 'localhost',
  database: 'company_db', // Make sure this matches your database name
  user: 'your_username',
  password: 'your_password',
  port: 5432
});

// Function to connect to the database
async function connectToDatabase() {
  await client.connect();
  console.log('Connected to the database');
}

// Function to run a query
async function runQuery(query, params) {
  try {
    const res = await client.query(query, params);
    return res.rows; // Return rows of data from the query
  } catch (err) {
    console.error('Error running query', err);
    throw err;
  }
}

// Function to close the database connection
async function closeConnection() {
  await client.end();
  console.log('Disconnected from the database');
}

// Export functions to be used in other files
module.exports = {
  connectToDatabase,
  runQuery,
  closeConnection
};
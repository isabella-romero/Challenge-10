import pkg from 'pg';
const { Client } = pkg;

// Set up PostgreSQL client
export const client = new Client({
  host: 'localhost',
  database: 'company_db', // Make sure this matches your database name
  user: 'postgres',
  password: 'Lucia071604',
  port: 5432
});

// Function to connect to the database
export async function connectToDatabase() {
  await client.connect();
  console.log('Connected to the database');
}

// Function to run a query
export async function runQuery(query, params) {
  try {
    const res = await client.query(query, params);
    return res.rows; // Return rows of data from the query
  } catch (err) {
    console.error('Error running query', err);
    throw err;
  }
}

// Function to close the database connection
export async function closeConnection() {
  await client.end();
  console.log('Disconnected from the database');
}

// Export functions to be used in other files

//export {connectToDatabase,runQuery,closeConnection,client};

/*
module.exports = {
   connectToDatabase,
   runQuery,
   closeConnection,
   client

};
*/



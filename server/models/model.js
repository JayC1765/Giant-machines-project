const { Pool } = require('pg');
require('dotenv').config();

// MUST FIRST CREATE a database in psql using CREATE DATABASE <Name>;
const pool = new Pool({
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || 'localhost',
  // Defaults to 5432 to Postgres
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'giant_machines',
});

pool.query(`CREATE TABLE IF NOT EXISTS timesheets (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  client VARCHAR(50) NOT NULL,
  project VARCHAR(50) NOT NULL,
  project_code VARCHAR(50) NOT NULL,
  hours NUMERIC(20,2) NOT NULL,
  billable VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  billable_rate INTEGER NOT NULL
);`);

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

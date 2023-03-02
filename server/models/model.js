const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const fastcsv = require('fast-csv');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
});

const createDB = async () => {
  try {
    const pool = new Pool();

    const dbName = process.env.DB_NAME;
    const { rows } = await pool.query(
      `SELECT exists (SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower($1));`,
      [dbName]
    );
    const { exists } = rows[0];

    if (!exists) {
      await pool.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database ${dbName} has been created`);
    } else {
      console.log(`Database ${dbName} already exist`);
    }
  } catch (err) {
    if (err) {
      console.log(`Error while creating a database, ${err}`);
    }
  }
};

const createTable = async (pool) => {
  try {
    await pool.query(`DROP TABLE IF EXISTS timesheets`);

    await pool.query(
      `CREATE TABLE IF NOT EXISTS timesheets (
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
      );`
    );
  } catch (err) {
    if (err) {
      console.log(`Error while creating a database table, ${err}`);
    }
  }
};

const uploadData = (pool) => {
  let stream = fs.createReadStream(
    path.resolve(__dirname, '../GM_sample_data.csv')
  );

  let csvData = [];
  let csvStream = fastcsv
    .parse()
    .on('data', function (data) {
      csvData.push(data);
    })
    .on('end', function () {
      csvData.shift();

      const query = `INSERT INTO timesheets (date, client, project, project_code, hours, billable, first_name, last_name, billable_rate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;

      pool.connect((err, client, done) => {
        if (err) throw err;

        try {
          csvData.forEach((row) => {
            client.query(query, row, (err, res) => {
              if (err) {
                console.log(err.stack);
              }
            });
          });
        } finally {
          console.log('Inserted a total of ' + csvData.length + ' rows');
          done();
        }
      });
    });

  stream.pipe(csvStream);
};

const initDB = async () => {
  try {
    await createDB();
    await createTable(pool);
    uploadData(pool);

    return;
  } catch (err) {
    if (err) {
      console.log(`Error while initializing database, ${err}`);
    }
  }
};

initDB();

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

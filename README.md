# Giant Machines Project

A full stack web application used to track the hours and revenue for clients and their respective projects.

## Technologies Used

- React
- Node
- Express
- PostgreSQL

## Prerequisites

Make sure you have a recent version of [Node](https://nodejs.org/en/) v16.14 or above and [PostgreSQL](https://www.postgresql.org/download/) installed. For PostgreSQL, I recommend installing v15.1 as well as the PSQL Powershell terminal to run queries directly from the command line.

## Getting Started

1. With the psql powershell terminal, please create a database with the following `CREATE DATABASE <dbname>;`. I recommend calling it `'giant_machines'` since the Postgres configuration set up in the application defaults to that. However, feel free to use any name but make sure to update the .env file so the correct fields will populate when the database connect starts.

- Use that new database by running `\c <dbname>` in the powershell

2. Update the .env file variables (optional for some variables) but the database user (usually defaults to 'postgres') and password might be required
3. Install dependencies for the frontend by running `npm install` at the root directory
4. Install dependencies in server directory by running `cd server` and `npm install`
5. Run `npm start` inside the server directory (please **ensure** step 1 is completed first)

- Server currently runs on http://localhost:8080. If changed to a different port, please update the "proxy" value inside the `package.json` at the root directory

6. To upload the data in csv format into our newly created database, you can run the following script below inside the PSQL terminal:

<<<<<<< HEAD
`` \COPY timesheets (date, client, project, project_code, hours, billable, first_name, last_name, billable_rate) FROM '`<pathToServerFolder>`/Giant-machines-project/server/GM_sample_data.csv' DELIMITER ',' CSV HEADER; ``
=======
\COPY timesheets (date, client, project, project_code, hours, billable, first_name, last_name, billable_rate) FROM '`<pathToServerFolder>`/Giant-machines-project/server/GM_sample_data.csv' DELIMITER ',' CSV HEADER;

> > > > > > > 973bd31071c86512c6557fd68319bd9543fef3ea

Example: \COPY timesheets (date, client, project, project_code, hours, billable, first_name, last_name, billable_rate) FROM '/Users/JasonChan/Projects/Giant-machines-project/server/GM_sample_data.csv' DELIMITER ',' CSV HEADER;

7. Run `npm start` at the root. Enjoy!

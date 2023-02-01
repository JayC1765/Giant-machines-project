# Giant Machines Project

A full stack web application used to track the hours and revenue for clients and their respective projects.

## Technologies Used

-   React
-   Node
-   Express
-   PostgreSQL

### Prerequisites

Make sure you have a recent version of [Node](https://nodejs.org/en/) v16.14 or above and [PostgreSQL](https://www.postgresql.org/download/) installed. For PostgreSQL, I recommend installing v15.1 as well as the PSQL Powershell terminal to run queries directly from the command line.

### Getting Started

1. With the psql powershell terminal, please create a database with the following 'CREATE DATABASE <dbname>;'. I recommend calling it 'giant_machines' since the Postgres configuration set up in the application defaults to that. However, feel free to use any name but make sure to update the .env file so the correct fields will populate when the database connect starts. Use that new database by running '\c <dbname>'

2. Update the .env file variables (optional for some variables) but the database user (usually defaults to 'postgres') and password might be required
3. npm install at the root
4. cd server and npm install
5. npm start inside the server folder (please ensure step 1 is completed first)

   - server currently runs on http://localhost:8080. If changed to a different port, please update the "proxy" value inside the package.json at the root directory

6. To upload the data in csv format into our newly created database, you can run the following script below inside the PSQL terminal:

\COPY timesheets (date, client, project, project_code, hours, billable, first_name, last_name, billable_rate) FROM '<pathToServerFolder>/Giant-machines-project/server/GM_sample_data.csv' DELIMITER ',' CSV HEADER;

Example: \COPY timesheets (date, client, project, project_code, hours, billable, first_name, last_name, billable_rate) FROM '/Users/JasonChan/Projects/Giant-machines-project/server/GM_sample_data.csv' DELIMITER ',' CSV HEADER;

7. npm start at the root. Enjoy!

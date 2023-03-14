const db = require('../models');
const Timesheet = db.timesheets;
const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');

const uploadData = () => {
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

      try {
        csvData.forEach((row) => {
          let [
            date,
            client,
            project,
            project_code,
            hours,
            billable,
            first_name,
            last_name,
            billable_rate,
          ] = row;

          Timesheet.create({
            date,
            client,
            project,
            project_code,
            hours,
            billable,
            first_name,
            last_name,
            billable_rate,
          });
        });
      } catch (err) {
        if (err) console.log(`Error uploading CSV file ${err}`);
      }
    });

  stream.pipe(csvStream);
};

const uploadCSV = async () => {
  await uploadData();
  console.log('CSV files have been uploaded');
};

uploadCSV();

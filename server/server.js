const express = require('express');
const app = express();
require('dotenv').config();
const PORT = 8080;
const router = require('./routes/router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/timesheets', router);

// catch-all route handler for any requests to an unknown route
app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

// global error handler to catch all middleware errors and log them in the console
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);

  console.error(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

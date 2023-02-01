const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

// Get all timesheet entries
router.get('/', controller.getTimesheets, (req, res) => {
  res.status(200).json(res.locals.result);
});

// Creates a timesheet entry
router.post('/addTimesheet', controller.addTimesheet, (req, res) => {
  res.status(200).json('success');
});

// Get all project names, client names, project code
router.get('/clientInfo', controller.getClientInfo, (req, res) => {
  res.status(200).json(res.locals.result);
});

module.exports = router;

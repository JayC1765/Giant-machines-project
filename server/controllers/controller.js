const db = require('../models/model');
const { formatData } = require('../helper/helper');

const controller = {
  getTimesheets: async (req, res, next) => {
    try {
      const allTimesheets = await db.query(
        `SELECT client, project, hours, billable, billable_rate FROM timesheets;`
      );

      const projectsArr = formatData(allTimesheets.rows);
      res.locals.result = projectsArr;
      return next();
    } catch (err) {
      if (err) {
        return next({
          log: `Error getting all timesheets, ${err}`,
          message: 'There is an error while retrieving all timesheets',
        });
      }
    }
  },

  addTimesheet: async (req, res, next) => {
    try {
      const {
        date,
        client,
        project,
        project_code,
        hours,
        billable,
        first_name,
        last_name,
        billable_rate,
      } = req.body;

      await db.query(
        `INSERT INTO timesheets (date, client, project, project_code, hours, billable, first_name, last_name, billable_rate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
        [
          date,
          client,
          project,
          project_code,
          hours,
          billable,
          first_name,
          last_name,
          billable_rate,
        ]
      );

      return next();
    } catch (err) {
      if (err) {
        return next({
          log: `Error with adding timesheet, ${err}`,
          message: 'There is an error with adding the timesheet',
        });
      }
    }
  },

  getClientInfo: async (req, res, next) => {
    try {
      const getProjects = await db.query(
        `SELECT project FROM timesheets GROUP BY project;`
      );

      const getProjectCodes = await db.query(
        `SELECT project_code FROM timesheets GROUP BY project_code;`
      );

      const getClients = await db.query(
        `SELECT client FROM timesheets GROUP BY client;`
      );

      const allProjects = getProjects.rows.map((p) => p.project);
      const allProjectCodes = getProjectCodes.rows.map((p) => p.project_code);
      const allClients = getClients.rows.map((c) => c.client);
      res.locals.result = {
        allProjects,
        allProjectCodes,
        allClients,
      };

      return next();
    } catch (err) {
      if (err) {
        return next({
          log: `Error getting client information, ${err}`,
          message: 'There is an error while retrieving client information',
        });
      }
    }
  },
};

module.exports = controller;

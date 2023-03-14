const db = require('../models');
const Timesheet = db.timesheets;
const { formatData } = require('../helper/helper');

const controller = {
  getTimesheets: async (req, res, next) => {
    try {
      const allTimesheets = await Timesheet.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });

      const projectsArr = formatData(allTimesheets);
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

      await Timesheet.create({
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
      const getProjects = await Timesheet.findAll({
        attributes: ['project'],
        group: 'project',
      });

      const getProjectCodes = await Timesheet.findAll({
        attributes: ['project_code'],
        group: 'project_code',
      });

      const getClients = await Timesheet.findAll({
        attributes: ['client'],
        group: 'client',
      });

      const allProjects = getProjects.map((p) => p.project);
      const allProjectCodes = getProjectCodes.map((p) => p.project_code);
      const allClients = getClients.map((c) => c.client);
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
          message: {
            err: 'There is an error while retrieving client information',
          },
        });
      }
    }
  },
};

module.exports = controller;

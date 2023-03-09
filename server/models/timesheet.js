const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Timesheet = sequelize.define('timesheets', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  client: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  project: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  project_code: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  hours: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  billable: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  first_name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  billable_rate: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Timesheet;

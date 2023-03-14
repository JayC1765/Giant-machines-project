const dbConfig = require('../config/dbConfig.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  // logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to Database');
  })
  .catch((err) => {
    console.log('Error' + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.timesheets = require('./timesheet')(sequelize, DataTypes);
// db.employee = require('./employee.js')(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log('yes re-sync done!');
});

// 1 to Many Relation

// db.employee.hasMany(db.timesheet, {
//   foreignKey: 'employee_id',
//   as: 'timesheet',
// });

// db.timesheet.belongsTo(db.employee, {
//   foreignKey: 'employee_id',
//   as: 'employee',
// });

module.exports = db;

module.exports = (sequelize, DataTypes) => {
  const Timesheet = sequelize.define('timesheets', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    client: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    project: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    project_code: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    hours: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    billable: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    billable_rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Timesheet;
};

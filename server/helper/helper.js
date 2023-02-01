const formatData = (timesheets) => {
  const allProjects = {};

  for (const timesheet of timesheets) {
    let { client, project, hours, billable, billable_rate } = timesheet;

    hours = parseFloat(hours);

    if (!(project in allProjects)) allProjects[project] = {};

    updateProjects(
      allProjects[project],
      client,
      hours,
      billable,
      billable_rate
    );
  }
  const projectsArr = [];

  for (const [k, v] of Object.entries(allProjects)) {
    const projectSummary = {
      [k]: v,
    };

    projectsArr.push(projectSummary);
  }

  return projectsArr;
};

const updateProjects = (
  projectCache,
  client,
  hours,
  billable,
  billable_rate
) => {
  if (!(client in projectCache)) {
    projectCache[client] = {
      totalHours: 0,
      billableHours: 0,
      billableAmount: 0,
    };
  }

  projectCache[client].totalHours += hours;
  if (billable === 'Yes') {
    projectCache[client].billableHours += hours;
    projectCache[client].billableAmount += hours * billable_rate;
  }
  return;
};

module.exports = {
  formatData,
  updateProjects,
};

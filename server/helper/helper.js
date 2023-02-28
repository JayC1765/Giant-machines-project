const formatData = (timesheets) => {
  const allProjects = {};

  timesheets.forEach((t) => {
    const { client, project, hours, billable, billable_rate } = t;
    const parsedHours = parseFloat(hours);

    if (!(project in allProjects)) allProjects[project] = {};

    updateClients(
      allProjects[project],
      client,
      parsedHours,
      billable,
      billable_rate
    );
  });

  const projectsArr = [];
  for (const [k, v] of Object.entries(allProjects)) {
    const projectSummary = {
      [k]: v,
    };

    projectsArr.push(projectSummary);
  }
  return projectsArr;
};

const updateClients = (
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
  updateClients,
};

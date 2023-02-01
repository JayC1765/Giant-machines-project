import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import Modal from './components/Modal';

const App = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [projects, setProjects] = useState([]);

  const getTimesheets = () => {
    fetch('/timesheets')
      .then((res) => res.json())
      .then((res) => setTimesheets(res))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getTimesheets();
  }, []);

  useEffect(() => {
    const formatProjects = () => {
      const formattedProjectData = [];

      for (const timesheet of timesheets) {
        for (const project in timesheet) {
          for (const client in timesheet[project]) {
            const projectDetails = timesheet[project][client];
            formattedProjectData.push([project, client, projectDetails]);
          }
        }
      }
      setProjects(formattedProjectData);
    };

    formatProjects();
  }, [timesheets]);

  return (
    <div className='main-container'>
      <h1 className='main-header'>Giant Machine Timesheets</h1>
      <Modal />
      <Dashboard projects={projects} />
    </div>
  );
};

export default App;

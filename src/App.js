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
      const clientsArr = [];
      for (const timesheet of timesheets) {
        const singleClient = [];

        for (const project in timesheet) {
          singleClient.push(project);

          for (const client in timesheet[project]) {
            singleClient.push(client);
            singleClient.push(timesheet[project][client]);
          }
        }
        clientsArr.push(singleClient);
      }
      setProjects(clientsArr);
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

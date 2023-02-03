import React, { useState, useEffect } from 'react';
import { generateDate } from '../helpers';

const Form = ({ setIsOpen }) => {
  const [values, setValues] = useState({
    date: generateDate(),
    client: '',
    project: '',
    project_code: '',
    hours: '',
    billable: '',
    first_name: '',
    last_name: '',
    billable_rate: '',
  });

  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [projectCode, setProjectCode] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getClientInfo = () => {
      fetch('/timesheets/clientInfo')
        .then((res) => res.json())
        .then((res) => {
          setProjects(res.allProjects);
          setProjectCode(res.allProjectCodes);
          setClients(res.allClients);
        })
        .catch((e) => console.log(e));
    };

    getClientInfo();
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/timesheets/addTimesheet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: values.date,
        client: values.client,
        project: values.project,
        project_code: values.project_code,
        hours: values.hours,
        billable: values.billable,
        first_name: values.first_name,
        last_name: values.last_name,
        billable_rate: values.billable_rate,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('res is ', res);
        if (res === 'success') {
          window.location = '/';
        } else {
          throw Error(res);
        }
      })
      .catch((err) => {
        setIsError(true);
        setErrorMessage(err.message);
      });
  };

  return (
    <form className='modal-form' onSubmit={handleSubmit}>
      <div id='general-group'>
        <div className='date-field'>
          <label>Date:</label>
          <input
            type='date'
            name='date'
            min='2015-01-01'
            max='2023-12-31'
            required
            value={values.date}
            onChange={handleChange}
          />
        </div>
        <div className='form-field' id='employee-field'>
          <div>
            <label>First Name:</label>
            <input
              type='text'
              name='first_name'
              required
              value={values.first_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type='text'
              name='last_name'
              required
              value={values.last_name}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div id='client-group'>
        <div className='client-field'>
          <div>
            <label>Client:</label>
            <select
              id='client'
              name='client'
              required
              value={values.client}
              onChange={handleChange}
            >
              <option>Select Client</option>
              {clients.map((c, i) => (
                <option key={`${c}, ${i}`} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Project:</label>
            <select
              id='project'
              name='project'
              required
              value={values.project}
              onChange={handleChange}
            >
              <option>Select Project</option>
              {projects.map((p, i) => (
                <option key={`${p}, ${i}`} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Project Code:</label>
            <select
              id='project_code'
              name='project_code'
              required
              value={values.project_code}
              onChange={handleChange}
            >
              <option value=''>Select Project Code</option>
              {projectCode.map((p, i) => (
                <option key={`${p}, ${i}`} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='client-hours'>
          <div>
            <label>Hours:</label>
            <input
              type='number'
              // min='0'
              max={150}
              name='hours'
              value={values.hours}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Billable Rate:</label>
            <input
              type='number'
              name='billable_rate'
              value={values.billable_rate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Billable:</label>
            <select
              id='billable'
              name='billable'
              value={values.billable}
              onChange={handleChange}
            >
              <option></option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          {isError && (
            <div
              className='form-error-message'
              style={{ color: 'red', marginLeft: '30px' }}
            >
              {errorMessage}
            </div>
          )}
        </div>
        <div className='modal-btn-container'>
          <button className='form-submit' type='submit'>
            Submit
          </button>
          <button
            className='form-submit'
            id='cancel-modal-btn'
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;

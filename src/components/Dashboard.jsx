import { useEffect, useState } from 'react';
import { formatHours, formatBillable } from '../helpers';
import Table from './Table';

const Dashboard = ({ projects }) => {
  const [totalHours, setTotalHours] = useState(0);
  const [billable, setBillable] = useState(0);

  useEffect(() => {
    const calculate = () => {
      let totalHr = 0;
      let billableAmt = 0;

      projects.forEach((p) => {
        const { totalHours, billableAmount } = p[2];
        totalHr += totalHours;
        billableAmt += billableAmount;
      });

      setTotalHours(totalHr);
      setBillable(billableAmt);
    };

    calculate();
  }, [projects]);

  return (
    <>
      <div className='dashboard-container'>
        <div>
          <h3>Hours Tracked</h3>
          <h2>{formatHours(totalHours)}</h2>
        </div>
        <div>
          <h3>Billable Amount</h3>
          <h2>{formatBillable(billable)}</h2>
        </div>
      </div>
      <Table projects={projects} />
    </>
  );
};

export default Dashboard;

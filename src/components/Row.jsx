const Row = ({ project, client, details }) => {
  let { totalHours, billableHours, billableAmount } = details;

  totalHours = (Math.round(totalHours * 100) / 100).toFixed(2);
  billableHours = (Math.round(billableHours * 100) / 100).toFixed(2);
  billableAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format((billableAmount = Math.round(billableAmount * 100) / 100));

  const renderPercent = () => {
    if (Number(billableHours) === 0) return '0';
    return ((billableHours / totalHours) * 100).toFixed(2);
  };

  return (
    <tr>
      <td className='row-project'>{project}</td>
      <td className='row-client'>{client}</td>
      <td className='row-hour'>{totalHours}</td>
      <td className='row-bill-hours'>
        <div>{billableHours}</div>
        <div className='row-bill-hours-percent'>{`(${renderPercent()}%)`}</div>
      </td>
      <td className='row-amount'>
        {billableAmount === '$0.00' ? (
          <span className='zero-amounts'>------</span>
        ) : (
          billableAmount
        )}
      </td>
    </tr>
  );
};

export default Row;

const TableHeader = () => {
  return (
    <thead>
      <tr className='table-header'>
        <th className='header-name'>Name</th>
        <th className='header-client'>Clients</th>
        <th className='header-hour'>Hours</th>
        <th className='header-bill-hour'>Billable Hours</th>
        <th className='header-bill-amt'>Billable Amount</th>
      </tr>
    </thead>
  );
};

export default TableHeader;

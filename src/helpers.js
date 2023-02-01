export const formatHours = (hours) => {
  const splitHours = (Math.round(hours * 100) / 100)
    .toLocaleString()
    .split('.');

  return (
    <>
      <span className='smaller-font'>{`${splitHours[0]}.`}</span>
      <span className='larger-font'>{splitHours[1]}</span>
    </>
  );
};

export const formatBillable = (x) => {
  const splitAmt = x
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    .split('.');

  return (
    <>
      <span className='larger-font'>$</span>
      <span className='smaller-font'>{`${splitAmt[0]}.`}</span>
      <span className='larger-font'>{splitAmt[1]}</span>
    </>
  );
};

export const generateDate = () => {
  const today = new Date();
  const numberOfDaysToAdd = 3;
  const date = today.setDate(today.getDate() + numberOfDaysToAdd);
  const defaultValue = new Date(date).toISOString().split('T')[0];

  return defaultValue;
};

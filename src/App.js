import React from 'react';
import AdDataTable from './dataTable';
import MoreDataTable from './moreData';

const App = () => {
  const getYesterdayDate = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const day = (`0${yesterday.getDate()}`).slice(-2);
    const month = (`0${yesterday.getMonth() + 1}`).slice(-2); // Months are zero-based
    const year = yesterday.getFullYear();

    return `${day}-${month}-${year}`; // Returns DD-MM-YYYY
  };

  const yesterdayDate = getYesterdayDate();

  return (
    <div>
      <AdDataTable yesterdayDate={yesterdayDate} />
      <MoreDataTable yesterdayDate={yesterdayDate} />
    </div>
  );
};

export default App;

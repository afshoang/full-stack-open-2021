import React from 'react';

const Filter = ({ keyword, handleChangeKeyword }) => {
  return (
    <div>
      filter show with: <input value={keyword} onChange={handleChangeKeyword} />
    </div>
  );
};

export default Filter;

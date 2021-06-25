import React from 'react';

const Notification = ({ alert }) => {
  return (
    alert !== null && (
      <div className={`notification ${alert.type}`}>{`${alert.msg}`}</div>
    )
  );
};

export default Notification;

import React from 'react';

const Notification = ({ message }) => {
  if (message.str === '') {
    return null;
  }

  return (
    <div className={`notification ${message.variant}`}>{`${message.str}`}</div>
  );
};

export default Notification;

import React from 'react';

const Total = ({ parts }) => {
  let totalEx = 0;
  for (let part of parts) {
    totalEx = totalEx + part.exercises;
  }

  return (
    <>
      <p>Number of exercises: {totalEx}</p>
    </>
  );
};

export default Total;

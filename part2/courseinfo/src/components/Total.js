import React from 'react';

const Total = ({ parts }) => {
  const totalEx = parts.reduce((total, part) => {
    return total + part.exercises;
  }, 0);

  return (
    <>
      <p>
        <strong>Total of {totalEx} exercises</strong>
      </p>
    </>
  );
};

export default Total;

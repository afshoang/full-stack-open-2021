import React from 'react';
import Part from './Part';

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.name} name={part.name} exercises={part.exercise} />
      ))}
    </>
  );
};

export default Content;

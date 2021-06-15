import React, { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

// const Statistic = ({ text, value }) => {
//   return (
//     <p>
//       {text} {value}
//     </p>
//   );
// };

const Statistics = ({ good, neutral, bad }) => {
  let all = good + bad + neutral;
  let average = (good * 1 - bad) / (good + bad + neutral);
  let positive = (good / (good + bad + neutral)) * 100;

  return (
    <>
      {/* <Statistic text='good' value={good} />
      <Statistic text='neutral' value={neutral} />
      <Statistic text='bad' value={bad} />
      <Statistic text='All' value={all} />
      {good + bad + neutral > 0 && <Statistic text='Average' value={average} />}
      {good + bad + neutral > 0 && (
        <Statistic text='Positive' value={positive} />
      )} */}

      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{all}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positive} %</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <h1>Statistics</h1>
      {good + neutral + bad <= 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad} />
      )}
    </>
  );
};

export default App;

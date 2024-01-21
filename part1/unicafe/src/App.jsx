import { useState } from "react";
import "./index.css";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => (
  <tbody>
    <tr>
      <td>{text}</td>
      <td>{text === "positive" ? `${value} %` : value}</td>
    </tr>
  </tbody>
);

const Statistics = ({ good, neutral, bad, total, all }) => {
  if (all === 0) {
    return (
      <section>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </section>
    );
  }
  return (
    <section>
      <h2>Statistics</h2>
      <table>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"average"} value={(total / all).toFixed(1)} />
        <StatisticLine
          text={"positive"}
          value={((good / all) * 100).toFixed(1)}
        />
      </table>
    </section>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // total score
  const [total, setTotal] = useState(0);

  // total number of votes
  const all = good + neutral + bad;

  // event handlers for feedback buttons
  const handleBtnGood = () => {
    setGood(good + 1);
    setTotal(total + 1);
  };
  const handleBtnNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBtnBad = () => {
    setBad(bad + 1);
    setTotal(total - 1);
  };

  return (
    <main>
      {/* Give feedback */}
      <section>
        <h1>Give Feedback</h1>
        <Button handleClick={handleBtnGood} text={"good"} />
        <Button handleClick={handleBtnNeutral} text={"neutral"} />
        <Button handleClick={handleBtnBad} text={"bad"} />
      </section>

      {/* Statistics */}
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        all={all}
      />
    </main>
  );
};

export default App;

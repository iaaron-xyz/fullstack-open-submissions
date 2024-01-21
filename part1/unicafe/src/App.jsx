import { useState } from "react";
import "./index.css";

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
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {good + neutral + bad}</p>
      <p>Average: {total / all}</p>
      <p>Positive: {(good / all) * 100}</p>
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
        <button onClick={handleBtnGood}>good</button>
        <button onClick={handleBtnNeutral}>neutral</button>
        <button onClick={handleBtnBad}>bad</button>
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

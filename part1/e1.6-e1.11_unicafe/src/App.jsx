import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + bad + neutral;
  const average = (good * 1 + neutral * 0 + bad * -1) / 3;
  const positive = good && total > 0 && (good / total) * 100;

  const handleGood = () => {
    setGood((prev) => prev + 1);
  };
  const handleNeutral = () => {
    setNeutral((prev) => prev + 1);
  };

  const handleBad = () => {
    setBad((prev) => prev + 1);
  };

  return (
    <div style={{ height: "100vh", textAlign: "start", marginTop: "50px" }}>
      <div>
        <h1>Give FeedBack</h1>
        <div style={{ display: "flex", gap: "4px", justifyContent: "start" }}>
          <button onClick={handleGood}>Good</button>
          <button onClick={handleNeutral}>Neutral</button>
          <button onClick={handleBad}>Bad</button>
        </div>
      </div>
      <div style={{ marginTop: "50px" }}>
        <Statistics props={[good, bad, neutral, total, average, positive]} />
      </div>
    </div>
  );
};

export default App;

const Statistics = ({ props }) => {
  console.log(props);
  const [good, bad, neutral, total, average, positive] = props;
  return (
    <>
      <h2>Statistics</h2>
      {total > 0 ? (
        <div>
          <table style={{ textAlign: "justify" }}>
            <tbody>
              <tr>
                <th>Good : </th>
                <td>{good}</td>
              </tr>
              <tr>
                <th>Neutral : </th>
                <td>{neutral}</td>
              </tr>
              <tr>
                <th>Bad : </th>
                <td>{bad}</td>
              </tr>
              <tr>
                <th>Total : </th>
                <td>{total}</td>
              </tr>
              <tr>
                <th>Average : </th>
                <td>{average.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Positive : </th>
                <td>{positive.toFixed(2)}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>No feedbacks Given Yet</p>
      )}
    </>
  );
};

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./store/store";

const App = () => {
  const good = () => {
    store.dispatch({
      type: "GOOD",
    });
  };

  const ok = () => {
    store.dispatch({
      type: "OK",
    });
  };

  const bad = () => {
    store.dispatch({
      type: "BAD",
    });
  };

  const reset = () => {
    store.dispatch({
      type: "ZERO",
    });
  };

  return (
    <div className="appContainer">
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div className="stats-container">
        <div className="stats">good - {store.getState().good}</div>
        <div className="stats">ok - {store.getState().ok}</div>
        <div className="stats">bad - {store.getState().bad}</div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);

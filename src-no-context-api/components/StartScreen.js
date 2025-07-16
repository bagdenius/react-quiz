import React from "react";

const StartScreen = ({ questionsCount, dispatch }) => {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{questionsCount} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: `startTest` })}
      >
        Let's start
      </button>
    </div>
  );
};

export default StartScreen;

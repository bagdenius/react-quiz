import React from "react";
import { useQuizContext } from "../contexts/QuizContext";

const StartScreen = () => {
  const { questionsCount, dispatch } = useQuizContext();
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

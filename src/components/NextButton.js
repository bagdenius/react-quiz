import React from "react";

export default function NextButton({
  dispatch,
  answer,
  currentQuestion,
  numberOfQuestions,
}) {
  if (answer === null) return;

  if (currentQuestion < numberOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: `nextQuestion` })}
      >
        Next
      </button>
    );

  if (currentQuestion === numberOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: `finishTest` })}
      >
        Finish
      </button>
    );
}

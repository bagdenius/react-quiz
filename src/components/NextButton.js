import React from "react";
import { useQuizContext } from "../contexts/QuizContext";

export default function NextButton() {
  const { dispatch, answer, currentQuestion, numberOfQuestions } =
    useQuizContext();

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

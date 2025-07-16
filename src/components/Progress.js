import React from "react";
import { useQuizContext } from "../contexts/QuizContext";

export default function Progress() {
  const {
    currentQuestion,
    numberOfQuestions,
    points,
    maxPossiblePoints,
    answer,
  } = useQuizContext();
  return (
    <header className="progress">
      <progress
        max={numberOfQuestions}
        value={currentQuestion + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{currentQuestion + 1}</strong> / {numberOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

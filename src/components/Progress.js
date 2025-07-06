import React from "react";

export default function Progress({
  currentQuestion,
  numberOfQuestions,
  points,
  maxPossiblePoints,
  answer,
}) {
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

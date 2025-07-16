import { useQuizContext } from "../contexts/QuizContext";

const Options = () => {
  const { questions, currentQuestion, answer, dispatch } = useQuizContext();
  const question = questions.at(currentQuestion);
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer && `answer`} ${
            hasAnswered
              ? index === question.correctOption
                ? `correct`
                : `wrong`
              : ``
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: `answer`, payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;

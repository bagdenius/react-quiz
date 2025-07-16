import Options from "./Options";
import { useQuizContext } from "../contexts/QuizContext";

const Question = () => {
  const { questions, currentQuestion } = useQuizContext();
  const question = questions.at(currentQuestion);

  return (
    <div>
      <h4>question.question</h4>
      <Options />
    </div>
  );
};

export default Question;

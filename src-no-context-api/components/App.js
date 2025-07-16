import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import NextButton from "./NextButton";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const SECONDS_PER_QUESTION = 30;

// status states: loading, error, ready, active, finished
const initialState = {
  questions: [],
  status: `loading`,
  currentQuestion: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 9,
};

function reducer(state, action) {
  switch (action.type) {
    case `dataReceived`:
      return { ...state, questions: action.payload, status: `ready` };
    case `dataFailed`:
      return { ...state, status: `error` };
    case `startTest`:
      return {
        ...state,
        status: `active`,
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    case `nextQuestion`:
      return {
        ...state,
        currentQuestion: state.currentQuestion++,
        answer: null,
      };
    case `answer`:
      const question = state.questions.at(state.currentQuestion);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case `finishTest`:
      return {
        ...state,
        status: `finished`,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case `restartTest`:
      return { ...initialState, questions: state.questions, status: `ready` };
    case `tick`:
      return {
        ...state,
        secondsRemaining: state.secondsRemaining--,
        status: state.secondsRemaining === 0 ? `finished` : state.status,
      };
    default:
      throw new Error(`Unknown action`);
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      currentQuestion,
      answer,
      points,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numberOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (previous, current) => previous + current.points,
    0
  );

  useEffect(() => {
    fetch(`http://localhost:8000/questions`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: `dataReceived`, payload: data }))
      .catch((error) => dispatch({ type: `dataFailed` }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === `loading` && <Loader />}
        {status === `error` && <Error />}
        {status === `ready` && (
          <StartScreen questionsCount={numberOfQuestions} dispatch={dispatch} />
        )}
        {status === `active` && (
          <>
            <Progress
              currentQuestion={currentQuestion}
              numberOfQuestions={numberOfQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            ></Progress>
            <Question
              question={questions[currentQuestion]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                currentQuestion={currentQuestion}
                numberOfQuestions={numberOfQuestions}
              ></NextButton>
            </Footer>
          </>
        )}
        {status === `finished` && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          ></FinishScreen>
        )}
      </Main>
    </div>
  );
}

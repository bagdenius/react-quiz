import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

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

const QuizProvider = ({ children }) => {
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
    <QuizContext.Provider
      value={{
        questions,
        status,
        currentQuestion,
        answer,
        points,
        highscore,
        secondsRemaining,
        numberOfQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

function useQuizContext() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error(`QuizContext was used outside the QuizProvider!`);
  return context;
}

export { QuizProvider, useQuizContext };

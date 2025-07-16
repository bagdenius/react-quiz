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
import { useQuizContext } from "../contexts/QuizContext";

export default function App() {
  const { status } = useQuizContext();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === `loading` && <Loader />}
        {status === `error` && <Error />}
        {status === `ready` && <StartScreen />}
        {status === `active` && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === `finished` && <FinishScreen></FinishScreen>}
      </Main>
    </div>
  );
}

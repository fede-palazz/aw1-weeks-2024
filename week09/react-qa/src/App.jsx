import "bootstrap/dist/css/bootstrap.min.css";
import { Answer, Question } from "./QAModels.mjs";
import NavHeader from "./components/NavHeader";
import { Container } from "react-bootstrap";
import QuestionDescription from "./components/QuestionDescription";
import Answers from "./components/AnswerComponents";
import { useState } from "react";

const fakeQuestion = new Question(
  1,
  "Is JavaScript better than Python?",
  "luigi.derussis@polito.it",
  "2024-02-07"
);
fakeQuestion.init();
const fakeAnswers = fakeQuestion.getAnswers();

function App() {
  const [question, setQuestion] = useState(fakeQuestion);
  const [answers, setAnswers] = useState(fakeAnswers);

  const voteUp = (answerId) => {
    setAnswers((oldAnswers) => {
      return oldAnswers.map((ans) => {
        if (ans.id === answerId)
          // ritorno una nuova, aggiornata, risposta
          return new Answer(
            ans.id,
            ans.text,
            ans.email,
            ans.date,
            ans.score + 1
          );
        else return ans;
      });
    });
  };

  const addAnswer = (answer) => {
    setAnswers((answers) => {
      const newId = Math.max(...answers.map((ans) => ans.id)) + 1;
      const newAnswer = new Answer(
        newId,
        answer.text,
        answer.email,
        answer.date,
        0
      );
      return [...answers, newAnswer];
    });
  };

  const updateAnswer = (answer) => {
    setAnswers((oldAnswers) => {
      return oldAnswers.map((ans) => {
        if (ans.id === answer.id)
          return new Answer(
            answer.id,
            answer.text,
            answer.email,
            answer.date,
            ans.score
          );
        else return ans;
      });
    });
  };

  const deleteAnswer = (answerId) => {
    setAnswers((oldAnswers) =>
      oldAnswers.filter((answer) => answer.id !== answerId)
    );
  };

  return (
    <>
      <NavHeader questionNum={question.id} />
      <Container fluid className="mt-3 pb-4">
        <QuestionDescription question={question} />
        <Answers
          answers={answers}
          voteUp={voteUp}
          addAnswer={addAnswer}
          updateAnswer={updateAnswer}
          deleteAnswer={deleteAnswer}
        ></Answers>
      </Container>
    </>
  );
}

export default App;

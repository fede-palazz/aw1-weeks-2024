import "./App.css";
import { Question } from "./assets/QAModels.js";
import NavHeader from "./components/NavHeader.jsx";
import QuestionDescr from "./components/questionDescr.jsx";
import { Container } from "react-bootstrap";
import Answers from "./components/Answers.jsx";

const fakeQuestion = new Question(
  1,
  "Is Javascript better than Python?",
  "prova@gmail.com",
  "2024-02-07"
);
fakeQuestion.init();

function App() {
  return (
    <>
      <NavHeader questionNum={fakeQuestion.id}></NavHeader>
      <Container fluid className="mt-3">
        <QuestionDescr {...fakeQuestion}></QuestionDescr>
        <Answers answers={fakeQuestion.answers} />
      </Container>
    </>
  );
}

export default App;

/* eslint-disable react/prop-types */
import { Row, Col, Table, Button } from "react-bootstrap";

function Answers(props) {
  return (
    <>
      <Row>
        <Col as="h2">Answers:</Col>
      </Row>
      <Row>
        <Col lg={10} className="mx-auto">
          <AnswerTable answers={props.answers} />
        </Col>
      </Row>
    </>
  );
}

function AnswerTable({ answers }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Text</th>
          <th>Author</th>
          <th>Score</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {answers.map((answer) => (
          <AnswerRow answer={answer} key={answer.id} />
        ))}
      </tbody>
    </Table>
  );
}

function AnswerRow({ answer }) {
  return (
    <tr>
      <td>{answer.date.format("YYYY-MM-DD")}</td>
      <td>{answer.text}</td>
      <td>{answer.email}</td>
      <td>{answer.score}</td>
      <td>
        <Button variant="warning">
          <i className="bi bi-arrow-up"></i>
        </Button>
        <Button variant="primary" className="mx-1">
          <i className="bi bi-pencil-square"></i>
        </Button>
        <Button variant="danger">
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  );
}

export default Answers;

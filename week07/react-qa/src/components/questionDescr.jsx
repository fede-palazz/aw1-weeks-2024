/* eslint-disable react/prop-types */
import { Row, Col } from "react-bootstrap";

function QuestionDescr({ id, email, text }) {
  return (
    <>
      <Row>
        <Col md={6} as="p">
          <strong>Question #{id}:</strong>
        </Col>
        <Col md={6} as="p" className="text-end">
          Asked by{" "}
          <span className="badge rounded-pill text-bg-secondary">{email}</span>
        </Col>
      </Row>
      <Row>
        <Col as="p" className="lead">
          {text}
        </Col>
      </Row>
    </>
  );
}

export default QuestionDescr;

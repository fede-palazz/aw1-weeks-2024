import { Col, Container, Row } from "react-bootstrap";
import { Link, useRouteError } from "react-router-dom";

export default function NotFound() {
  const error = useRouteError();
  return (
    <Container>
      <Row>
        <Col>
          <h2>Error: {error?.statusText || error?.message}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <img
            src="https://i.stack.imgur.com/Esppm.png"
            alt="page not found"
            className="d-block my-3 w-75"
            referrerPolicy="no-referrer"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to="/" className="btn btn-primary mt-2 my-5">
            Go Home
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

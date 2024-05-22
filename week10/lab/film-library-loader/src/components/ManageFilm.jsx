import { Col, Container, Row } from "react-bootstrap";
import FilmForm from "./FilmForm";
import Navigation from "./Navigation";

export default function ManageFilm() {
  return (
    <div className="vh-100 d-flex flex-column">
      <Navigation hideFilters={true} />
      <Container fluid className="h-100">
        <Row className="h-100">
          <Col className="p-4">
            <FilmForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

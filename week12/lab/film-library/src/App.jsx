import Navigation from "./components/Navigation";
import { Row, Col, Container } from "react-bootstrap";
import { Sidebar } from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import API from "./API";
import FILTERS from "./assets/filters.js";

function App() {
  return (
    <div className="vh-100 d-flex flex-column">
      <Navigation filters={FILTERS} />
      <Container fluid className="h-100">
        <Row className="h-100">
          <Sidebar filters={FILTERS} />
          <Col className="p-4">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

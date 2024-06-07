import Navigation from "./components/Navigation";
import { Row, Col, Container } from "react-bootstrap";
import { Sidebar } from "./components/Sidebar";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import FILTERS from "./assets/filters.js";
import BgSpinner from "./components/BgSpinner.jsx";
import { useEffect, useState } from "react";

function App() {
  const navigation = useNavigation();
  const location = useLocation();

  return (
    <div className="vh-100 d-flex flex-column">
      {navigation.state === "loading" && location.pathname !== navigation.location.pathname && (
        <BgSpinner />
      )}
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

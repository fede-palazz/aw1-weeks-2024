import { CollectionPlay, PersonCircle } from "react-bootstrap-icons";
import { Container, Form, Navbar } from "react-bootstrap";

function Navigation() {
  return (
    <Navbar
      expand="md"
      className="bg-primary px-2 justify-content-between"
      data-bs-theme="dark"
    >
      <Container
        fluid
        className="d-flex justify-content-between align-content-center"
      >
        <Navbar.Toggle aria-controls="navbarCollapse" />
        <Navbar.Brand href="#">
          <CollectionPlay className="mx-2" />
          <span className="text-light">Film Library</span>
        </Navbar.Brand>
        {/* <span className="self-align-end d-md-none">Prova</span> */}
        <PersonCircle size="36" className="text-light d-md-none" />

        <Navbar.Collapse id="navbarCollapse">
          <Form className="mt-2 mt-md-0" data-bs-theme="light">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 text-light"
              aria-label="Search"
            />
          </Form>
        </Navbar.Collapse>
        <PersonCircle size="36" className="text-light d-none d-md-block" />
      </Container>
    </Navbar>
  );
}

export default Navigation;

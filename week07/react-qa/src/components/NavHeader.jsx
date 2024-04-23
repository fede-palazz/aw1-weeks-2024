import { Container, Navbar } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
export default function NavHeader({ questionNum }) {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand>HeapOverrun - Question #{questionNum}</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

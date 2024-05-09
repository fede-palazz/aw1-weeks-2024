import { CollectionPlay, PersonCircle } from "react-bootstrap-icons";
import { Button, Container, Form, InputGroup, Navbar } from "react-bootstrap";
import { Search, XLg } from "react-bootstrap-icons";
import { CollapsedSidebar } from "./Sidebar";

function Navigation({
  filterItems,
  activeFilter,
  searchTerm,
  handleFilterChange,
  handleSearchChange,
}) {
  return (
    <Navbar expand="md" className="bg-primary px-2" data-bs-theme="dark">
      <Container fluid className="d-flex align-content-center">
        <Navbar.Toggle aria-controls="navbarCollapse" />
        <Navbar.Brand href="#">
          <CollectionPlay className="mx-2" />
          <span className="text-light">Film Library</span>
        </Navbar.Brand>
        <PersonCircle size="36" className="text-light d-md-none" />

        <Navbar.Collapse
          id="navbarCollapse"
          className="justify-content-md-center"
        >
          <div className="py-3 py-md-0 col-md-8">
            <InputGroup data-bs-theme="light">
              <Form.Control
                placeholder="Search film"
                aria-label="search film"
                aria-describedby="search bar"
                className="border-end-0 shadow-none border-light"
                value={searchTerm}
                onChange={(event) => handleSearchChange(event.target.value)}
              />
              <InputGroup.Text className="bg-body">
                {searchTerm.length === 0 && (
                  <Button variant="link" className="py-0 px-0 my-0">
                    <Search size={16} className="text-dark" />
                  </Button>
                )}
                {searchTerm.length > 0 && (
                  <Button
                    variant="link"
                    className="py-0 px-0 my-0"
                    onClick={() => handleSearchChange("")}
                  >
                    <XLg size={16} className="text-dark" />
                  </Button>
                )}
              </InputGroup.Text>
            </InputGroup>

            <div className="d-md-none">
              <CollapsedSidebar
                filterItems={filterItems}
                activeFilter={activeFilter}
                handleFilterChange={handleFilterChange}
              />
            </div>
          </div>
        </Navbar.Collapse>
        <PersonCircle size="36" className="text-light d-none d-md-block" />
      </Container>
    </Navbar>
  );
}

export default Navigation;

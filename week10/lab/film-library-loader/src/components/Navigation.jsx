import { CollectionPlay, PersonCircle } from "react-bootstrap-icons";
import { Button, Container, Form, InputGroup, Navbar } from "react-bootstrap";
import { Form as RouterForm, useLoaderData, useSubmit } from "react-router-dom";
import { Search, XLg } from "react-bootstrap-icons";
import { CollapsedSidebar } from "./Sidebar";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Navigation({ filterItems, activeFilter, hideFilters = false }) {
  const submit = useSubmit();
  const { searchTerm } = useLoaderData();

  useEffect(() => {
    const searchBar = document.getElementById("search");
    if (searchBar) searchBar.value = searchTerm;
  }, [searchTerm]);

  return (
    <Navbar expand="md" className="bg-primary px-2" data-bs-theme="dark">
      <Container fluid className="d-flex align-content-center">
        <Navbar.Toggle aria-controls="navbarCollapse" />
        <Link to={"/"} className="text-decoration-none">
          <Navbar.Brand>
            <CollectionPlay className="mx-2" />
            <span className="text-light">Film Library</span>
          </Navbar.Brand>
        </Link>

        <PersonCircle size="36" className="text-light d-md-none" />

        <Navbar.Collapse
          id="navbarCollapse"
          className="justify-content-md-center"
        >
          {!hideFilters && (
            <div className="py-3 py-md-0 col-md-8">
              <RouterForm id="search-form" role="search">
                <InputGroup data-bs-theme="light">
                  <Form.Control
                    id="search"
                    name="search"
                    type="search"
                    placeholder="Search film"
                    aria-label="search film"
                    aria-describedby="search bar"
                    className="border-end-0 shadow-none border-light"
                    defaultValue={searchTerm}
                    onChange={(event) => {
                      submit(event.currentTarget.form, {
                        replace: true,
                      });
                    }}
                  />
                  <InputGroup.Text className="bg-body">
                    {searchTerm?.length === 0 && (
                      <Button variant="link" className="py-0 px-0 my-0">
                        <Search size={16} className="text-dark" />
                      </Button>
                    )}
                    {searchTerm?.length > 0 && (
                      <Button
                        variant="link"
                        className="py-0 px-0 my-0"
                        onClick={() => {
                          const formData = new FormData();
                          formData.append("search", "");
                          submit(formData, {
                            replace: true,
                          });
                        }}
                      >
                        <XLg size={16} className="text-dark" />
                      </Button>
                    )}
                  </InputGroup.Text>
                </InputGroup>
              </RouterForm>

              <div className="d-md-none">
                <CollapsedSidebar
                  filterItems={filterItems}
                  activeFilter={activeFilter}
                  // handleFilterChange={handleFilterChange}
                />
              </div>
            </div>
          )}
        </Navbar.Collapse>
        <PersonCircle size="36" className="text-light d-none d-md-block" />
      </Container>
    </Navbar>
  );
}

export default Navigation;

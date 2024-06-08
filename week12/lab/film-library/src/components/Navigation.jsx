import { CollectionPlay, PersonCircle } from "react-bootstrap-icons";
import { Button, Container, Form, InputGroup, Navbar, Spinner } from "react-bootstrap";
import { Search, XLg } from "react-bootstrap-icons";
import { CollapsedSidebar } from "./Sidebar";
import {
  Link,
  Form as RouterForm,
  useLoaderData,
  useLocation,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { useEffect } from "react";

function Navigation({ filters, showSearchbar = true }) {
  const { searchTerm } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();
  const location = useLocation();
  const searching =
    navigation.location && new URLSearchParams(navigation.location.search).has("searchTerm");

  useEffect(() => {
    const searchBox = document.getElementById("searchTerm");
    if (searchBox) searchBox.value = searchTerm;
  }, [searchTerm]);

  return (
    <Navbar expand="md" className="bg-primary px-2" data-bs-theme="dark">
      <Container fluid className="d-flex align-content-center">
        <Navbar.Toggle aria-controls="navbarCollapse" />
        <Link to={"/films"} className="text-decoration-none">
          <Navbar.Brand>
            <CollectionPlay className="mx-2" />
            <span className="text-light">Film Library</span>
          </Navbar.Brand>
        </Link>
        <PersonCircle size="32" className="text-light d-md-none" />

        <Navbar.Collapse id="navbarCollapse" className="justify-content-md-center">
          <div className="py-3 py-md-0 col-md-8">
            {showSearchbar && (
              <RouterForm id="searchFilm" role="search" action={location.pathname}>
                <InputGroup data-bs-theme="light">
                  <Form.Control
                    name="searchTerm"
                    id="searchTerm"
                    placeholder="Search film"
                    defaultValue={searchTerm}
                    aria-label="Search film"
                    aria-describedby="search bar"
                    type="search"
                    className="border-end-0 shadow-none border-light"
                    onChange={(e) => {
                      // const isFirstSearch = !searchTerm;
                      submit(e.currentTarget.form, {
                        // replace: !isFirstSearch,
                        replace: true,
                      });
                    }}
                  />
                  <InputGroup.Text className="bg-body">
                    {searchTerm.length === 0 && !searching && (
                      <Button variant="link" className="py-0 px-0 my-0">
                        <Search size={16} className="text-dark" />
                      </Button>
                    )}
                    {searchTerm.length > 0 && !searching && (
                      <Button
                        type="reset"
                        variant="link"
                        className="py-0 px-0 my-0"
                        onClick={() => submit(null)}
                      >
                        <XLg size={16} className="text-dark" />
                      </Button>
                    )}
                    {searching && (
                      <Button
                        variant="link"
                        disabled
                        className="py-0 px-0 my-0"
                        onClick={() => submit(null)}
                      >
                        <Spinner
                          variant="dark"
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span className="visually-hidden">Loading...</span>
                      </Button>
                    )}
                  </InputGroup.Text>
                </InputGroup>
              </RouterForm>
            )}
            <div className="d-md-none">
              <CollapsedSidebar filters={filters} />
            </div>
          </div>
        </Navbar.Collapse>
        <PersonCircle size="32" className="text-light d-none d-md-block my-1" />
      </Container>
    </Navbar>
  );
}

export default Navigation;

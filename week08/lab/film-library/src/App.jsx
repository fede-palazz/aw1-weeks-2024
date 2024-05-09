import Navigation from "./components/Navigation";
import { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { Sidebar } from "./components/Sidebar";
import FILMS from "./assets/FILMS";
import { Plus } from "react-bootstrap-icons";
import dayjs from "dayjs";
import FilmTable from "./components/FilmTable";

const filterItems = [
  "all",
  "favourites",
  "best rated",
  "seen last month",
  "unseen",
];

function App() {
  const [activeFilter, setActiveFilter] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [films, setFilms] = useState(FILMS);

  const handleFilterChange = (activeFilter) => {
    setActiveFilter(activeFilter);
  };

  const handleSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const filterFilms = (films, activeFilter = 0, title = "") => {
    // Filter for title first
    let filteredFilms =
      title !== ""
        ? films.filter((film) =>
            film.title.toLowerCase().includes(title.toLowerCase())
          )
        : films;

    switch (activeFilter) {
      case 1:
        // isFavorite = true
        filteredFilms = filteredFilms.filter((film) => film.isFavorite);
        break;
      case 2:
        // rating = 5
        filteredFilms = filteredFilms.filter((film) => film.rating === 5);
        break;
      case 3:
        // watchDate < 1 month
        filteredFilms = filteredFilms.filter(
          (film) => film.watchDate && dayjs().diff(film.watchDate, "month") <= 1
        );
        break;
      case 4:
        filteredFilms = filteredFilms.filter(
          (film) => film.watchDate === null || film.watchDate === undefined
        );
        break;
      default:
        break;
    }
    return filteredFilms;
  };

  return (
    <div className="vh-100 d-flex flex-column">
      <Navigation
        filterItems={filterItems}
        activeFilter={activeFilter}
        searchTerm={searchTerm}
        handleFilterChange={handleFilterChange}
        handleSearchChange={handleSearchChange}
      />
      <Container fluid className="h-100">
        <Row className="h-100">
          <Sidebar
            filterItems={filterItems}
            activeFilter={activeFilter}
            handleFilterChange={handleFilterChange}
          />
          <Col className="p-4">
            <p className="fs-3">
              {filterItems[activeFilter][0].toUpperCase() +
                filterItems[activeFilter].substring(1)}
            </p>
            <FilmTable films={filterFilms(films, activeFilter, searchTerm)} />
            <Button
              variant="primary"
              size="lg"
              className="rounded-circle py-2 position-fixed bottom-0 end-0 mx-5 my-4"
            >
              <Plus size={24} />
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

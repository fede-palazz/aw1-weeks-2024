import Navigation from "./components/Navigation";
import { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { Sidebar } from "./components/Sidebar";
import FILMS from "./assets/FILMS";
import { Plus } from "react-bootstrap-icons";
import dayjs from "dayjs";
import FilmTable from "./components/FilmTable";
import FilmForm from "./components/FilmForm";
import { Film } from "./assets/filmModel";

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
  const [mode, setMode] = useState("view");
  const [editFilm, setEditFilm] = useState({});

  const handleFilterChange = (activeFilter) => {
    setActiveFilter(activeFilter);
  };

  const handleSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleDeleteFilm = (filmId) => {
    setFilms((films) => films.filter((film) => film.id !== filmId));
  };

  const handleAddFilm = ({ title, isFavorite, watchDate, rating }) => {
    setFilms((prevFilms) => {
      const filmId = Math.max(...prevFilms.map((film) => film.id)) + 1;
      const film = new Film(filmId, 2, title, isFavorite, watchDate, rating);
      return [...prevFilms, film];
    });
    setMode("view");
  };

  const handleUpdateFilm = ({ id, title, isFavorite, watchDate, rating }) => {
    setFilms((prevFilms) =>
      prevFilms.map((film) =>
        film.id === id
          ? new Film(
              id,
              2,
              title ?? film.title,
              isFavorite ?? film.isFavorite,
              watchDate ?? film.watchDate,
              rating ?? film.rating
            )
          : film
      )
    );
    setMode("view");
    setEditFilm({});
  };

  const handleEditFilm = (id, title, isFavorite, watchDate, rating) => {
    setEditFilm({ id, title, isFavorite, watchDate, rating });
    setMode("edit");
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

  const capitalizeWord = (word) => word[0].toUpperCase() + word.substring(1);

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
          {/* In view mode display the film table */}
          {mode === "view" && (
            <Col className="p-4">
              <p className="fs-3">
                {capitalizeWord(filterItems[activeFilter])}
              </p>
              <FilmTable
                films={filterFilms(films, activeFilter, searchTerm)}
                handleDelete={handleDeleteFilm}
                handleEdit={handleEditFilm}
              />

              <Button
                variant="primary"
                size="lg"
                className="rounded-circle py-2 position-fixed bottom-0 end-0 mx-5 my-4"
                onClick={() => setMode("add")}
              >
                <Plus size={24} />
              </Button>
            </Col>
          )}
          {/* In add mode display the form only */}
          {(mode === "add" || mode === "edit") && (
            <Col className="p-4">
              <p className="fs-3">
                {mode === "add" ? "Add new film" : "Update film info"}
              </p>
              <FilmForm
                {...editFilm}
                mode={mode}
                handleCancel={() => {
                  setMode("view");
                  setEditFilm({});
                }}
                handleAdd={handleAddFilm}
                handleUpdate={handleUpdateFilm}
              />
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default App;

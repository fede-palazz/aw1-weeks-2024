import Navigation from "./components/Navigation";
import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Sidebar } from "./components/Sidebar";
import dayjs from "dayjs";
import { Film } from "./assets/filmModel";
import { Routes, Route, Outlet } from "react-router-dom";
import FilmList from "./pages/FilmList";
import NotFound from "./pages/NotFound";
import FilmData from "./pages/FilmData";

const filters = [
  {
    id: "",
    label: "All",
    url: "",
    filterFunction: () => true,
  },
  {
    id: "favorites",
    label: "Favorites",
    url: "/favorites",
    filterFunction: (film) => film.isFavorite,
  },
  {
    id: "best",
    label: "Best Rated",
    url: "/best",
    filterFunction: (film) => film.rating === 5,
  },
  {
    id: "recent",
    label: "Seen Last Month",
    url: "/recent",
    filterFunction: (film) =>
      film.watchDate && dayjs().diff(film.watchDate, "month") <= 1,
  },
  {
    id: "unseen",
    label: "Unseen",
    url: "/unseen",
    filterFunction: (film) => !film?.watchDate,
  },
];

function App() {
  const [films, setFilms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("");

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
  };

  const handleUpdateFilm = ({ id, title, isFavorite, watchDate, rating }) => {
    setFilms((prevFilms) =>
      prevFilms.map((film) => {
        if (film.id === id)
          return new Film(
            id,
            2,
            title ?? film.title,
            isFavorite ?? film.isFavorite,
            watchDate ?? film.watchDate,
            rating ?? film.rating
          );
        return film;
      })
    );
  };

  return (
    <div className="vh-100 d-flex flex-column">
      <Navigation
        filters={filters}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <Container fluid className="h-100">
        <Routes>
          <Route
            path="/"
            element={
              <Row className="h-100">
                <Sidebar filters={filters} />
                <Col className="p-4">
                  <Outlet />
                </Col>
              </Row>
            }
          >
            <Route
              index
              element={
                <FilmList
                  films={films}
                  filters={filters}
                  searchTerm={searchTerm}
                  handleDeleteFilm={handleDeleteFilm}
                  handleEditFilm={handleUpdateFilm}
                  handleFilterChange={setFilms}
                />
              }
            />
            <Route
              path=":filter"
              element={
                <FilmList
                  films={films}
                  filters={filters}
                  searchTerm={searchTerm}
                  handleDeleteFilm={handleDeleteFilm}
                  handleEditFilm={handleUpdateFilm}
                  handleFilterChange={setFilms}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route
            path="/add"
            element={
              <Row className="h-100">
                <Col className="p-4">
                  <FilmData
                    films={films}
                    handleAdd={handleAddFilm}
                    handleUpdate={handleUpdateFilm}
                  />
                </Col>
              </Row>
            }
          />
          <Route
            path="/edit/:filmId"
            element={
              <Row className="h-100">
                <Col className="p-4">
                  <FilmData
                    films={films}
                    handleAdd={handleAddFilm}
                    handleUpdate={handleUpdateFilm}
                  />
                </Col>
              </Row>
            }
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;

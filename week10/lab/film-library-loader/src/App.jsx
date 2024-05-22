import Navigation from "./components/Navigation";
import { useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { Sidebar } from "./components/Sidebar";
import FILMS from "./assets/FILMS";
import { Plus } from "react-bootstrap-icons";
import dayjs from "dayjs";
import FilmTable from "./components/FilmTable";
import { Film } from "./assets/filmModel";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const filterItems = [
  "all",
  "favorites",
  "best rated",
  "seen last month",
  "unseen",
];

export async function loader({ params, request }) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("search") ?? "";
  const activeFilter = params.filter ?? "all";
  return { activeFilter, searchTerm };
}

const filterFilms = (films, activeFilter = 0, title = "") => {
  // Filter for title first
  let filteredFilms =
    title !== ""
      ? films.filter((film) =>
          film.title.toLowerCase().includes(title.toLowerCase())
        )
      : films;

  switch (activeFilter) {
    case "favorites":
      // isFavorite = true
      filteredFilms = filteredFilms.filter((film) => film.isFavorite);
      break;
    case "best rated":
      // rating = 5
      filteredFilms = filteredFilms.filter((film) => film.rating === 5);
      break;
    case "seen last month":
      // watchDate < 1 month
      filteredFilms = filteredFilms.filter(
        (film) => film.watchDate && dayjs().diff(film.watchDate, "month") <= 1
      );
      break;
    case "unseen":
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

function App() {
  const { activeFilter, searchTerm } = useLoaderData();
  const [films, setFilms] = useState(FILMS);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddFilm = ({ title, isFavorite, watchDate, rating }) => {
    setFilms((prevFilms) => {
      const filmId = Math.max(...prevFilms.map((film) => film.id)) + 1;
      const film = new Film(filmId, 2, title, isFavorite, watchDate, rating);
      return [...prevFilms, film];
    });
  };

  const handleDeleteFilm = (filmId) => {
    setFilms((films) => films.filter((film) => film.id !== filmId));
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

  // A film needs to be added or updated
  useEffect(() => {
    if (location.state) {
      const { mode, film } = location.state;
      handleAddFilm(film);
      location.state = null;
    }
  }, [location.state]);

  return (
    <div className="vh-100 d-flex flex-column">
      <Navigation filterItems={filterItems} />
      <Container fluid className="h-100">
        <Row className="h-100">
          <Sidebar filterItems={filterItems} />
          <Col className="p-4">
            <p className="fs-3">{capitalizeWord(activeFilter)}</p>
            <FilmTable
              films={filterFilms(films, activeFilter, searchTerm)}
              handleDelete={handleDeleteFilm}
              handleEdit={handleUpdateFilm}
            />
            <Button
              variant="primary"
              size="lg"
              className="rounded-circle py-2 position-fixed bottom-0 end-0 mx-5 my-4"
              onClick={() => navigate("/films/add")}
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

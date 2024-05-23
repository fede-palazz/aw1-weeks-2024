import { Film } from "./assets/filmModel";
const SERVER_URL = "http://localhost:3001";

const getFilms = async (filter) => {
  const url = filter
    ? `${SERVER_URL}/api/films?filter=${filter}`
    : `${SERVER_URL}/api/films`;
  const response = await fetch(url);
  if (response.ok) {
    const films = await response.json();
    return films.map(
      (f) =>
        new Film(f.id, f.userId, f.title, f.isFavorite, f.watchDate, f.rating)
    );
  } else throw new Error("Internal server error");
};

const API = { getFilms };
export default API;

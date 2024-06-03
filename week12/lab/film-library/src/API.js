import { Film } from "./assets/filmModel";
const SERVER_URL = "http://localhost:3001";
const API_URL = `${SERVER_URL}/api/films`;

const getFilms = async (filter = "", searchTerm = "") => {
  const url = filter ? `${API_URL}?filter=${filter}` : `${API_URL}`;
  const response = await fetch(url);
  if (response.ok) {
    const films = await response.json();
    return films.map((f) => new Film(f.id, f.userId, f.title, f.isFavorite, f.watchDate, f.rating));
  } else throw new Error("Internal server error");
};

const API = { getFilms };
export default API;

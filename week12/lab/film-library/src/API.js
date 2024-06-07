import { Film } from "./assets/filmModel";
const SERVER_URL = "http://localhost:3001";
const API_URL = `${SERVER_URL}/api/films`;

const getFilms = async (filter = "", searchTerm = "") => {
  let url = API_URL + "?";
  url += filter ? `filter=${filter}&` : "";
  url += searchTerm ? `searchTerm=${searchTerm}` : "";
  const response = await fetch(url);
  if (response.ok) {
    const films = await response.json();
    return films.map((f) => new Film(f.id, f.userId, f.title, f.isFavorite, f.watchDate, f.rating));
  } else throw new Error("Internal server error");
};

const getFilm = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (response.ok) {
    const film = await response.json();
    return new Film(film.id, film.userId, film.title, film.isFavorite, film.watchDate, film.rating);
  } else throw new Error("Internal server error");
};

const addFilm = async (title, isFavorite, rating, watchDate) => {
  const userId = 2;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, isFavorite, rating, watchDate, userId }),
  });
  if (response.ok) {
    return true;
  } else throw new Error("Internal server error");
};

const updateFilm = async (id, title, isFavorite, rating, watchDate) => {
  id = Number(id);
  rating = Number(rating);
  watchDate = watchDate || null;
  console.log(JSON.stringify({ title, isFavorite, rating, watchDate }));
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, isFavorite, rating, watchDate }),
  });
  if (response.ok) {
    return true;
  } else throw new Error("Internal server error");
};

const deleteFilm = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    return true;
  } else throw new Error("Internal server error");
};

const API = { getFilms, getFilm, addFilm, updateFilm, deleteFilm };
export default API;

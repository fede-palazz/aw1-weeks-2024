import API from "../API";

export async function likeAction({ params, request }) {
  const id = params?.id;
  const formData = await request.formData();
  const isFavorite = formData.get("like") === "true" ? true : false;

  if (!id) {
    throw new Error("Invalid film");
  }
  const film = await API.getFilm(id);
  if (!film) {
    throw new Error("Invalid film");
  }
  const response = await API.updateFilm(
    id,
    film.title,
    isFavorite,
    film.rating,
    film.watchDate?.format("YYYY-MM-DD")
  );
  if (!response) console.error("Network error");
  return null;
}

export async function rateAction({ params, request }) {
  const id = params?.id;
  const formData = await request.formData();
  const rating = formData.get("rate");

  if (!id) {
    throw new Error("Invalid film");
  }
  const film = await API.getFilm(id);
  if (!film) {
    throw new Error("Invalid film");
  }
  const response = await API.updateFilm(
    id,
    film.title,
    film.isFavorite,
    rating,
    film.watchDate?.format("YYYY-MM-DD")
  );
  if (!response) console.error("Network error");
  return null;
}

export async function deleteAction({ params }) {
  const id = params?.id;
  if (!id) {
    throw new Error("Invalid film");
  }
  const response = await API.deleteFilm(id);
  if (!response) console.error("Network error");
  return null;
}

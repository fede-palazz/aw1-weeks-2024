import FilmForm from "../components/FilmForm";
import { useParams } from "react-router-dom";

export default function FilmData({ films, handleAdd, handleUpdate }) {
  const { filmId } = useParams();
  const filmToEdit = films.find((film) => film.id === Number(filmId));

  return (
    <>
      <p className="fs-3">{filmId ? "Edit film" : "Add film"}</p>
      <FilmForm
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        {...filmToEdit}
      />
    </>
  );
}

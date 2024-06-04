import { Button } from "react-bootstrap";
import FilmTable from "../components/FilmTable";
import { Plus } from "react-bootstrap-icons";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function FilmList({ handleDeleteFilm, handleEditFilm }) {
  const navigate = useNavigate();
  const { films, activeFilter } = useLoaderData();

  return (
    <>
      <p className="fs-3">{activeFilter?.label || "All"}</p>
      <FilmTable films={films} handleDelete={handleDeleteFilm} handleEdit={handleEditFilm} />
      <Button
        variant="primary"
        size="lg"
        className="rounded-circle py-2 position-fixed bottom-0 end-0 mx-5 my-4"
        onClick={() => navigate("/films/add")}
      >
        <Plus size={24} />
      </Button>
    </>
  );
}

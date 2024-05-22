import { Button } from "react-bootstrap";
import FilmTable from "../components/FilmTable";
import { Plus } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";

export default function FilmList({
  films,
  filters,
  searchTerm,
  handleDeleteFilm,
  handleEditFilm,
}) {
  const navigate = useNavigate();
  const { filter: filterParam } = useParams();
  const activeFilter = filterParam
    ? filters.filter((filt) => filt.id === filterParam)[0]
    : null;

  const filterFilms = () => {
    // Filter for title first
    let filteredFilms =
      searchTerm !== ""
        ? films.filter((film) =>
            film.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : films;
    return activeFilter
      ? filteredFilms.filter(activeFilter.filterFunction)
      : filteredFilms;
  };

  return (
    <>
      <p className="fs-3">{activeFilter?.label || "All"}</p>
      <FilmTable
        films={filterFilms()}
        handleDelete={handleDeleteFilm}
        handleEdit={handleEditFilm}
      />

      <Button
        variant="primary"
        size="lg"
        className="rounded-circle py-2 position-fixed bottom-0 end-0 mx-5 my-4"
        onClick={() => navigate("add")}
      >
        <Plus size={24} />
      </Button>
    </>
  );
}

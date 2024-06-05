import { Button } from "react-bootstrap";
import FilmTable from "../components/FilmTable";
import { Plus } from "react-bootstrap-icons";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import FILTERS from "../assets/filters";
import API from "../API";

export async function loader({ params, request }) {
  const filter = params?.filter || "";
  const activeFilter = FILTERS.find((filt) => filt.id === filter);
  const searchTerm = new URL(request.url).searchParams.get("searchTerm") || "";

  if (!activeFilter && request.url.split("/").pop() !== "films") {
    throw new Error("Invalid filter");
  }
  const films = await API.getFilms(filter, searchTerm);
  return { films, activeFilter, searchTerm };
}

export async function action({ params, request }) {
  await API.deleteFilm(params.id);
  console.log(request);
  return null;
}

export default function FilmList() {
  const navigate = useNavigate();
  const { films, activeFilter } = useLoaderData();

  return (
    <>
      <p className="fs-3">{activeFilter?.label || "All"}</p>
      <FilmTable films={films} />
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

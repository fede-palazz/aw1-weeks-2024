import { Button } from "react-bootstrap";
import FilmTable from "../components/FilmTable";
import { Plus } from "react-bootstrap-icons";
import { useLoaderData, useNavigate } from "react-router-dom";
import FILTERS from "../assets/filters";
import API from "../API";

export async function loader({ params, request }) {
  const filter = params?.filter || "";
  const activeFilter = FILTERS.find((filt) => filt.id === filter);
  const searchTerm = new URL(request.url).searchParams.get("searchTerm") || "";

  if (!activeFilter && !request.url.split("/").pop().includes("films")) {
    throw new Error("Invalid filter");
  }
  const films = await API.getFilms(filter, searchTerm);
  if (!films) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { films, activeFilter, searchTerm };
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // Convert isFavorite into boolean
  data.isFavorite = data.isFavorite === "true" ? true : false;
  if (data.action === "delete") {
    await API.deleteFilm(data.id);
    return null;
  }
  if (data.action === "like") {
    data.isFavorite = !data.isFavorite;
  }
  await API.updateFilm(data.id, data.title, data.isFavorite, data.rating, data.watchDate);
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
        onClick={() => {
          navigate("/films/add");
        }}
      >
        <Plus size={24} />
      </Button>
    </>
  );
}

import { Col, Row } from "react-bootstrap";
import FilmForm from "../components/FilmForm";
import { useLoaderData } from "react-router-dom";
import Navigation from "../components/Navigation";
import API from "../API";

const filters = [
  {
    id: "films",
    label: "All",
    url: "/films",
  },
  {
    id: "favorites",
    label: "Favorites",
    url: "/films/favorites",
  },
  {
    id: "best",
    label: "Best Rated",
    url: "/films/best",
  },
  {
    id: "recent",
    label: "Seen Last Month",
    url: "/films/recent",
  },
  {
    id: "unseen",
    label: "Unseen",
    url: "/films/unseen",
  },
];
export async function loader({ params }) {
  const filmId = params?.id || "";
  let film = filmId ? await API.getFilm(filmId) : null;
  return { film };
}

export default function FilmData() {
  const { film } = useLoaderData();

  return (
    <>
      <Navigation filters={filters} showSearchbar={false} />
      <Row className="h-100">
        <Col className="p-4">
          <p className="fs-3">{film?.id ? "Edit film" : "Add film"}</p>
          <FilmForm />
        </Col>
      </Row>
    </>
  );
}

import { Col, Container, Row } from "react-bootstrap";
import FilmForm from "../components/FilmForm";
import { useLoaderData, useNavigation } from "react-router-dom";
import Navigation from "../components/Navigation";
import API from "../API";
import FILTERS from "../assets/filters";
import BgSpinner from "../components/BgSpinner";

export async function loader({ params }) {
  const filmId = params?.id || "";
  let film = filmId ? await API.getFilm(filmId) : null;
  return { film };
}

export default function FilmData() {
  const { film } = useLoaderData();
  const navigation = useNavigation();

  return (
    <div className="vh-100 d-flex flex-column">
      {navigation.state === "loading" && <BgSpinner />}
      <Navigation filters={FILTERS} showSearchbar={false} />
      <Container fluid className="h-100">
        <Row className="h-100">
          <Col className="p-4">
            <p className="fs-3">{film?.id ? "Edit film" : "Add film"}</p>
            <FilmForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

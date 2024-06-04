import Navigation from "./components/Navigation";
import { Row, Col, Container } from "react-bootstrap";
import { Sidebar } from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import API from "./API";

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

export async function loader({ params, request }) {
  const filter = params?.filter || "";
  const activeFilter = filters.find((filt) => filt.id === filter);
  if (!activeFilter && request.url.split("/").pop() !== "films") throw new Error("Invalid filter");
  const searchTerm = new URL(request.url).searchParams.get("searchTerm") || "";
  const films = await API.getFilms(filter, searchTerm);
  return { films, activeFilter, searchTerm };
}

function App() {
  return (
    <div className="vh-100 d-flex flex-column">
      <Navigation filters={filters} />
      <Container fluid className="h-100">
        <Row className="h-100">
          <Sidebar filters={filters} />
          <Col className="p-4">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

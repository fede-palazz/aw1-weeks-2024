import { Button, Form } from "react-bootstrap";
import { Star, StarFill, Trash, Pen } from "react-bootstrap-icons";
import Table from "react-bootstrap/Table";
import dayjs from "dayjs";
import RatingStars from "./RatingStars";

function FilmTable({ films }) {
  return (
    <Table responsive>
      <tbody>
        {films.map((film, index) => (
          <tr key={film.id} className={index % 2 == 0 ? "table-light" : ""}>
            {/* TITLE */}
            <td>{film.title}</td>
            {/* FAVORITE */}
            <td>
              <Form.Check // prettier-ignore
                type="checkbox"
                label="Favorite"
                name={`favorite-${film.id}`}
                checked={film.isFavorite}
                readOnly
              />
            </td>
            {/* WATCHDATE */}
            <td>
              {film.watchDate
                ? dayjs(film.watchDate).format("MMMM D, YYYY")
                : ""}
            </td>
            {/* RATING */}
            <td>
              <RatingStars rating={film.rating} />
            </td>
            {/* ACTIONS */}
            <td>
              <Button variant="link" className="p-1 icon-link-hover">
                <Pen className="text-dark" />
              </Button>
              <Button variant="link" className="p-1 icon-link-hover">
                <Trash className="text-dark" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default FilmTable;

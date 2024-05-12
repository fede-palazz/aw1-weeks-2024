import { Button } from "react-bootstrap";
import { Trash, Pen, Heart, HeartFill } from "react-bootstrap-icons";
import Table from "react-bootstrap/Table";
import dayjs from "dayjs";
import RatingStars from "./RatingStars";

function FilmTable({ films, handleDelete, handleEdit }) {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Title</th>
          <th>Favorite</th>
          <th>Watch date</th>
          <th>Rating</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {films.map((film, index) => (
          <tr key={film.id} className={index % 2 == 0 ? "table-light" : ""}>
            {/* TITLE */}
            <td>{film.title}</td>
            {/* FAVORITE */}
            <td className="px-4">
              {film.isFavorite ? <HeartFill /> : <Heart />}
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
            <td className="align-middle">
              <Button
                variant="link"
                className="p-1 icon-link-hover"
                onClick={() =>
                  handleEdit(
                    film.id,
                    film.title,
                    film.isFavorite,
                    film.watchDate.format("YYYY-MM-DD"),
                    film.rating
                  )
                }
              >
                <Pen className="text-dark" />
              </Button>
              <Button
                variant="link"
                className="p-1 icon-link-hover"
                onClick={() => handleDelete(film.id)}
              >
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

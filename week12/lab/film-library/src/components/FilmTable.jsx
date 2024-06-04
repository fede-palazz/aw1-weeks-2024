import { Button } from "react-bootstrap";
import { Trash, Pen, Heart, HeartFill } from "react-bootstrap-icons";
import Table from "react-bootstrap/Table";
import dayjs from "dayjs";
import RatingStars from "./RatingStars";
import { useNavigate } from "react-router-dom";

function FilmTable({ films, handleDelete, handleEdit }) {
  const navigate = useNavigate();

  return (
    <Table responsive className="align-middle">
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
              <Button
                variant="link"
                className="text-dark"
                onClick={() => handleEdit({ id: film.id, isFavorite: !film.isFavorite })}
              >
                {film.isFavorite ? <HeartFill /> : <Heart />}
              </Button>
            </td>
            {/* WATCHDATE */}
            <td>{film.watchDate ? dayjs(film.watchDate).format("MMMM D, YYYY") : ""}</td>
            {/* RATING */}
            <td>
              <RatingStars
                rating={film.rating}
                mode="hover"
                handleChangeRating={(rating) => handleEdit({ id: film.id, rating })}
              />
            </td>
            {/* ACTIONS */}
            <td className="align-middle">
              <Button
                variant="link"
                className="p-1 icon-link-hover"
                onClick={() => navigate(`/films/edit/${film.id}`)}
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

import { Button } from "react-bootstrap";
import { Trash, Pen, Heart, HeartFill } from "react-bootstrap-icons";
import Table from "react-bootstrap/Table";
import dayjs from "dayjs";
import RatingStars from "./RatingStars";
import { useFetcher, useNavigate, useSubmit } from "react-router-dom";

function FilmTable({ films }) {
  const navigate = useNavigate();
  const submit = useSubmit();

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
                type="submit"
                variant="link"
                className="text-dark"
                onClick={() => {
                  submit(
                    {
                      action: "like",
                      ...film,
                      watchDate: film.watchDate?.format("YYYY-MM-DD") ?? "",
                    },
                    {
                      method: "put",
                      navigate: false,
                    }
                  );
                }}
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
                handleChangeRating={(rating) => {
                  submit(
                    {
                      action: "rate",
                      ...film,
                      rating: `${rating}`,
                      watchDate: film.watchDate?.format("YYYY-MM-DD") ?? "",
                    },
                    {
                      method: "put",
                      navigate: false,
                    }
                  );
                }}
              />
            </td>
            {/* ACTIONS */}
            <td>
              <Button
                variant="link"
                className="p-1 icon-link-hover"
                onClick={() => navigate(`/films/edit/${film.id}`)}
              >
                <Pen className="text-dark" />
              </Button>
              <Button
                type="submit"
                name="action"
                value="delete"
                variant="link"
                className="p-1 icon-link-hover"
                onClick={() =>
                  submit(
                    { action: "delete", id: film.id },
                    {
                      method: "delete",
                      navigate: false,
                    }
                  )
                }
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

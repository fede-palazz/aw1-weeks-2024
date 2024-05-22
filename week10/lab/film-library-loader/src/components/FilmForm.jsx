import Form from "react-bootstrap/Form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { HeartFill } from "react-bootstrap-icons";
import { useState } from "react";
import { Button } from "react-bootstrap";
import RatingStars from "./RatingStars";

export async function addFilmLoader() {
  const searchTerm = "";
  const mode = "add";
  return { searchTerm, mode };
}

export async function editFilmLoader({ params, request }) {
  const searchTerm = "";
  const mode = "edit";
  return { searchTerm, mode };
}

export async function action({ request }) {
  console.log(request);
}

function FilmForm() {
  const { mode } = useLoaderData();
  const data = useLoaderData();
  const navigate = useNavigate();

  const [title, setTitle] = useState(data.title ?? "");
  const [watchDate, setWatchDate] = useState(data.watchDate ?? "");
  const [isFavorite, setIsFavorite] = useState(data.isFavorite ?? false);
  const [rating, setRating] = useState(data.rating ?? 0);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form from being submitted
    //  data: { title, watchDate, isFavorite, rating }
    if (mode === "add") {
      const film = { title, watchDate, isFavorite, rating };
      navigate("/films/all", {
        state: { mode, film },
      });
    }
    // props.mode === "edit"
    //   ? props.handleUpdate({
    //       id: props.id,
    //       title,
    //       isFavorite,
    //       watchDate,
    //       rating,
    //     })
    //   : props.handleAdd({
    //       title,
    //       watchDate,
    //       isFavorite,
    //       rating,
    //     });
    // else navigate("/films/all", { state: { mode: mode } });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Title */}
      <Form.Group className="mb-3" controlId="filmTitle">
        <Form.Label>Title*</Form.Label>
        <Form.Control
          type="text"
          name="filmTitle"
          className="w-50"
          placeholder="Titanic"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </Form.Group>
      {/* Watch Date */}
      <Form.Group className="mb-3" controlId="filmWatchDate">
        <Form.Label>When did you watch it?</Form.Label>
        <Form.Control
          type="date"
          name="filmWatchDate"
          className="w-50"
          value={watchDate}
          onChange={(event) => setWatchDate(event.target.value)}
        />
      </Form.Group>
      {/* Rating */}
      <Form.Group className="mb-4">
        <Form.Label>Rating*</Form.Label>
        <RatingStars
          rating={rating}
          id="ratingStars"
          size={32}
          mode="hover"
          handleChangeRating={(rating) => setRating(rating)}
        />
      </Form.Group>
      {/* Is favorite */}
      <Form.Group className="mb-4">
        <Form.Check type="checkbox">
          <Form.Check.Input
            type="checkbox"
            id="filmIsFavorite"
            name="filmIsFavorite"
            checked={isFavorite}
            onChange={(event) => setIsFavorite(event.target.checked)}
          />
          <Form.Check.Label>
            {`Add to my favorites `}
            <HeartFill />
          </Form.Check.Label>
        </Form.Check>
      </Form.Group>
      {/* Actions */}
      <Form.Group>
        <Button variant="primary" type="submit">
          {mode === "add" ? "Add" : "Update"}
        </Button>
        <Button
          variant="outline-secondary"
          type="button"
          onClick={() => navigate(-1)}
          className="mx-2"
        >
          Cancel
        </Button>
      </Form.Group>
    </Form>
  );
}

export default FilmForm;

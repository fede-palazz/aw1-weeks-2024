import Form from "react-bootstrap/Form";
import { HeartFill } from "react-bootstrap-icons";
import { useState } from "react";
import { Button } from "react-bootstrap";
import RatingStars from "./RatingStars";

function FilmForm(props) {
  const [title, setTitle] = useState(props.title || "");
  const [watchDate, setWatchDate] = useState(props.watchDate || "");
  const [isFavorite, setIsFavorite] = useState(props.isFavorite || false);
  const [rating, setRating] = useState(props.rating || 0);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form from being submitted
    // TODO: validate fields

    props.mode === "edit"
      ? props.handleUpdate({
          id: props.id,
          title,
          isFavorite,
          watchDate,
          rating,
        })
      : props.handleAdd({
          title,
          watchDate,
          isFavorite,
          rating,
        });
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
          size={32}
          mode="hover"
          handleChangeRating={(rating) => setRating(rating)}
        />
      </Form.Group>
      {/* Is favorite */}
      <Form.Group className="mb-4">
        <Form.Check type="checkbox" id={`filmIsFavorite`} name="filmIsFavorite">
          <Form.Check.Input
            type="checkbox"
            value={isFavorite}
            onChange={(event) => setIsFavorite(event.target.value)}
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
          {props.mode === "add" ? "Add" : "Update"}
        </Button>
        <Button
          variant="outline-secondary"
          type="button"
          onClick={props.handleCancel}
          className="mx-2"
        >
          Cancel
        </Button>
      </Form.Group>
    </Form>
  );
}

export default FilmForm;

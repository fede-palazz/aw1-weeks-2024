import { HeartFill } from "react-bootstrap-icons";
import { Form, Button } from "react-bootstrap";
import RatingStars from "./RatingStars";
import { redirect, useActionData, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import API from "../API";
import dayjs from "dayjs";

export async function action({ params, request }) {
  const formData = await request.formData();
  const formFields = Object.fromEntries(formData);
  const id = params?.id ?? "";
  const title = formFields.filmTitle;
  const watchDate = formFields.filmWatchDate;
  const isFavorite = formFields?.filmIsFavorite ? true : false;
  const rating = formFields.filmRating;

  const errors = {};
  // Title checks
  if (!title || title.length === 0) errors.title = "Title is required";
  else if (title.length < 5) errors.title = "Title is too short (min 5 characters)";
  console.log(formFields);
  // Watch date checks
  if (watchDate && !dayjs(watchDate).isValid()) errors.watchDate = "Select a valid watch date";
  else if (dayjs(watchDate).isAfter(new Date()))
    errors.watchDate = "Watch date can't be a future date";
  // Rating checks
  if (!rating || rating < 1 || rating > 5) errors.rating = "Select a valid rating value";
  // Validate form
  if (Object.keys(errors).length) {
    return errors;
  }
  if (id) {
    // Update film data
    await API.updateFilm(id, title, isFavorite, rating, watchDate);
  } else {
    // Add new film
    await API.addFilm(title, isFavorite, rating, watchDate);
  }
  return redirect("/films");
}

function FilmForm() {
  const { film } = useLoaderData();
  const errors = useActionData();
  const navigate = useNavigate();
  const submit = useSubmit();

  return (
    <Form method="post" id="film-form" noValidate>
      {/* Title */}
      <Form.Group className="mb-3" controlId="filmTitle">
        <Form.Label>Title*</Form.Label>
        <Form.Control
          type="text"
          name="filmTitle"
          className="w-50"
          placeholder="Titanic"
          defaultValue={film?.title ?? ""}
          isInvalid={errors?.title}
        />
        <Form.Control.Feedback type="invalid">{errors?.title}</Form.Control.Feedback>
      </Form.Group>
      {/* Watch Date */}
      <Form.Group className="mb-3" controlId="filmWatchDate">
        <Form.Label>When did you watch it?</Form.Label>
        <Form.Control
          type="date"
          name="filmWatchDate"
          className="w-50"
          defaultValue={film?.watchDate.format("YYYY-MM-DD") ?? ""}
          isInvalid={errors?.watchDate}
        />
        <Form.Control.Feedback type="invalid">{errors?.watchDate}</Form.Control.Feedback>
      </Form.Group>
      {/* Rating */}
      <Form.Group className="mb-4">
        <Form.Label>Rating*</Form.Label>
        <RatingStars
          rating={film?.rating ?? 0}
          size={32}
          mode="hover"
          isInvalid={!!errors?.rating}
          handleChangeRating={(rating) => {
            document.getElementById("filmRating").value = rating;
          }}
        />
        <Form.Control
          type="number"
          id="filmRating"
          name="filmRating"
          defaultValue={film?.rating ?? 0}
          hidden
          isInvalid={errors?.rating}
        />
        <Form.Control.Feedback type="invalid">{errors?.rating}</Form.Control.Feedback>
      </Form.Group>
      {/* Is favorite */}
      <Form.Group className="mb-4">
        <Form.Check type="checkbox" id="filmIsFavorite">
          <Form.Check.Input
            type="checkbox"
            name="filmIsFavorite"
            defaultChecked={film?.isFavorite ?? false}
          />
          <Form.Check.Label>
            {`Add to my favorites `}
            <HeartFill />
          </Form.Check.Label>
        </Form.Check>
      </Form.Group>
      {/* Actions */}
      <Form.Group>
        <Button
          variant="primary"
          onClick={(e) => {
            submit(e.currentTarget.form);
          }}
        >
          {film?.id ? "Update" : "Add"}
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

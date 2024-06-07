import { HeartFill } from "react-bootstrap-icons";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import RatingStars from "./RatingStars";
import { Form as RouterForm, redirect, useLoaderData, useNavigate } from "react-router-dom";
import API from "../API";

export async function action({ params, request }) {
  const formData = await request.formData();
  const formFields = Object.fromEntries(formData);
  const id = params?.id ?? "";
  const title = formFields.filmTitle;
  const watchDate = formFields.filmWatchDate;
  const isFavorite = formFields?.filmIsFavorite ? true : false;
  const rating = formFields.filmRating;
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
  const navigate = useNavigate();

  return (
    <RouterForm method="post" id="film-form">
      {/* Title */}
      <Form.Group className="mb-3" controlId="filmTitle">
        <Form.Label>Title*</Form.Label>
        <Form.Control
          type="text"
          name="filmTitle"
          className="w-50"
          placeholder="Titanic"
          defaultValue={film?.title ?? ""}
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
          defaultValue={film?.watchDate ?? ""}
        />
      </Form.Group>
      {/* Rating */}
      <Form.Group className="mb-4">
        <Form.Label>Rating*</Form.Label>
        <RatingStars
          rating={film?.rating ?? 0}
          size={32}
          mode="hover"
          handleChangeRating={(rating) => {
            document.getElementById("filmRating").value = rating;
          }}
        />
        <input
          type="number"
          id="filmRating"
          name="filmRating"
          defaultValue={film?.rating ?? 0}
          hidden
        />
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
        <Button variant="primary" type="submit">
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
    </RouterForm>
  );
}

export default FilmForm;

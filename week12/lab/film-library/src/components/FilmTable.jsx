import { Button } from "react-bootstrap";
import { Trash, Pen, Heart, HeartFill } from "react-bootstrap-icons";
import Table from "react-bootstrap/Table";
import dayjs from "dayjs";
import RatingStars from "./RatingStars";
import { useFetcher, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function FilmTable({ films }) {
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
          <FilmTableRow film={film} key={film.id} index={index} />
        ))}
      </tbody>
    </Table>
  );
}

function FilmTableRow({ film, index }) {
  const fetcherLike = useFetcher();
  const fetcherRate = useFetcher();
  const fetcherDelete = useFetcher();
  const navigate = useNavigate();
  let isFavorite = fetcherLike.formData
    ? fetcherLike.formData.get("like") === "true"
    : film.isFavorite;
  // if (fetcherLike.formData) isFavorite = isFavorite === "true" ? false : true;
  // const isFavorite = film.isFavorite;
  const rating = fetcherRate.formData ? fetcherRate.formData.get("rate") : film.rating;
  const hideRow = fetcherDelete.formData ? true : false;

  useEffect(() => {
    if (film.id === 1) {
      // console.log(film.isFavorite);
      // console.log(fetcherLike.formData?.get("like"));
    }
  }, [film.isFavorite, fetcherLike.formData]);
  return (
    <tr className={index % 2 == 0 ? "table-light" : ""} hidden={hideRow}>
      {/* TITLE */}
      <td>{film.title}</td>
      {/* FAVORITE */}
      <td className="px-4">
        <fetcherLike.Form method="post" action={`/films/like/${film.id}`}>
          <Button
            type="submit"
            variant="link"
            className="text-dark"
            name="like"
            // Submit the opposite value
            value={isFavorite ? "false" : "true"}
          >
            {isFavorite ? <HeartFill /> : <Heart />}
          </Button>
        </fetcherLike.Form>
      </td>
      {/* WATCHDATE */}
      <td>{film.watchDate ? dayjs(film.watchDate).format("MMMM D, YYYY") : ""}</td>
      {/* RATING */}
      <td>
        <RatingStars
          rating={rating}
          mode="hover"
          handleChangeRating={(rating) => {
            const formData = new FormData();
            formData.append("rate", `${rating}`);
            fetcherRate.submit(formData, { action: `/films/rate/${film.id}`, method: "POST" });
          }}
        />
      </td>
      {/* ACTIONS */}
      <td>
        <fetcherDelete.Form method="post" action={`/films/delete/${film.id}`}>
          <Button
            variant="link"
            className="p-1 icon-link-hover"
            onClick={() => navigate(`/films/edit/${film.id}`)}
          >
            <Pen className="text-dark" />
          </Button>
          <Button type="submit" name="delete" variant="link" className="p-1 icon-link-hover">
            <Trash className="text-dark" />
          </Button>
        </fetcherDelete.Form>
      </td>
    </tr>
  );
}

export default FilmTable;

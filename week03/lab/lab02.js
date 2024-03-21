import dayjs from "dayjs";
import sqlite from "sqlite3";

const db = new sqlite.Database("films.db", (err) => {
  if (err) throw err;
});

function Film(id, userId = 1, title, isFavorite = false, watchDate, rating) {
  this.id = id;
  this.userId = userId;
  this.title = title;
  this.isFavorite = isFavorite;
  this.watchDate = watchDate ? dayjs(watchDate) : null;
  this.rating = rating;
}

function FilmLibrary() {
  this.films = [];

  /**
   * Retrieve all the stored films and return a Promise
   * that resolves to an array of Film objects
   */
  this.getAllFilms = () =>
    new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films";
      db.all(sql, [], (err, rows) => {
        if (err) reject(err);
        const films = rows.map(
          (film) =>
            new Film(
              film.id,
              film.userId,
              film.title,
              film.isFavorite,
              film.watchDate,
              film.rating
            )
        );
        resolve(films);
      });
    });

  /**
   * Retrieve all favorite films and return a Promise
   * that resolves to an array of Film objects
   */
  this.getFavoriteFilms = () =>
    new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films WHERE isFavorite=1";
      db.all(sql, [], (err, rows) => {
        if (err) reject(err);
        const films = rows.map(
          (film) =>
            new Film(
              film.id,
              film.userId,
              film.title,
              film.isFavorite,
              film.watchDate,
              film.rating
            )
        );
        resolve(films);
      });
    });

  /**
   * Retrieve all films watched today and return a Promise
   * that resolves to an array of Film objects
   */
  this.getWatchedToday = () =>
    new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films WHERE watchDate=?";
      db.all(sql, [dayjs().format("YYYY-MM-DD")], (err, rows) => {
        if (err) reject(err);
        const films = rows.map(
          (film) =>
            new Film(
              film.id,
              film.userId,
              film.title,
              film.isFavorite,
              film.watchDate,
              film.rating
            )
        );
        resolve(films);
      });
    });

  /**
   * Retrieve films whose watch date is earlier than a given
   * date (received as a parameter).
   * Return a Promise that resolves to an array of Film objects.
   */
  this.getEarlierThan = (date) =>
    new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films WHERE watchDate<?";
      db.all(sql, [dayjs(date).format("YYYY-MM-DD")], (err, rows) => {
        if (err) reject(err);
        const films = rows.map(
          (film) =>
            new Film(
              film.id,
              film.userId,
              film.title,
              film.isFavorite,
              film.watchDate,
              film.rating
            )
        );
        resolve(films);
      });
    });

  /**
   * Retrieve films whose rating is greater than or equal to a
   * given number (received as a parameter).
   * Return a Promise that resolves to an array of Film objects
   */
  this.getRatingGreaterThan = (rating) =>
    new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films WHERE rating>=?";
      db.all(sql, [Number(rating)], (err, rows) => {
        if (err) reject(err);
        const films = rows.map(
          (film) =>
            new Film(
              film.id,
              film.userId,
              film.title,
              film.isFavorite,
              film.watchDate,
              film.rating
            )
        );
        resolve(films);
      });
    });

  /**
   * Retrieve films whose title contains a given string
   * (received as a parameter).
   * Return a Promise that resolves to an array of Film objects.
   */
  this.matchTitle = (pattern) =>
    new Promise((resolve, reject) => {
      const sql = "SELECT * FROM films WHERE title LIKE ?";
      db.all(sql, [`%${pattern}%`], (err, rows) => {
        if (err) reject(err);
        const films = rows.map(
          (film) =>
            new Film(
              film.id,
              film.userId,
              film.title,
              film.isFavorite,
              film.watchDate,
              film.rating
            )
        );
        resolve(films);
      });
    });

  /**
   * Store a new movie into the database
   */
  this.addFilm = (film) =>
    new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO films (title, isFavorite, rating, watchDate, userId) \
        VALUES (?,?,?,?,?)";
      db.run(
        sql,
        [
          film.title,
          film.isFavorite ? 1 : 0,
          film.rating,
          film.watchDate,
          film.userId,
        ],
        (err) => {
          if (err) reject(err);
          else resolve(film.id);
        }
      );
    });

  /**
   * Delete a movie from the database (using its ID as a reference)
   */
  this.deleteFilm = (id) =>
    new Promise((resolve, reject) => {
      const sql = "DELETE FROM films WHERE id=?";
      db.run(sql, [Number(id)], (err) => {
        if (err) reject(err);
        else resolve(id);
      });
    });

  /**
   * Delete the watch date of all films stored in the database
   */
  this.resetWatchDate = () =>
    new Promise((resolve, reject) => {
      const sql = "UPDATE films SET watchDate=null";
      db.run(sql, [], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
}

const library = new FilmLibrary();
library.getAllFilms().then((films) => console.log(films));
library.getFavoriteFilms().then((films) => console.log(films));
library.getWatchedToday().then((films) => console.log(films));
library.getEarlierThan("2024-03-20").then((films) => console.log(films));
library.getRatingGreaterThan(4).then((films) => console.log(films));
library.matchTitle("pulp").then((films) => console.log(films));

const film = new Film(6, 2, "Avatar", true, "2024-03-01", 2);
library
  .addFilm(film)
  .then((id) =>
    console.log(`Film with id ${id} successfully added to the library`)
  )
  .catch((err) => console.log(err));
library
  .deleteFilm(film.id)
  .then((id) => console.log(`Film with id ${id} successfully deleted`))
  .catch((err) => console.log(err));
library
  .resetWatchDate()
  .then(() => console.log(`Watch date successfully resetted`))
  .catch((err) => console.log(err));

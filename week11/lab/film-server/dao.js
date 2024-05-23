import { Film } from "./filmModel.js";
import sqlite from "sqlite3";

// open the database
const db = new sqlite.Database("films.db", (err) => {
  if (err) throw err;
});

/**
 * Retrieve the list of all the available films
 */
function getFilms() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT films.* FROM films";
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else {
        const films = rows.map(
          (f) =>
            new Film(
              f.id,
              f.userId,
              f.title,
              f.isFavorite,
              f.watchDate,
              f.rating
            )
        );
        resolve(films);
      }
    });
  });
}

/**
 * Retrieve a specific film
 */
function getFilm(id) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT films.* FROM films WHERE films.id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) reject(err);
      else if (row === undefined)
        reject({ error: "Question not available, check the inserted id." });
      else
        resolve(
          new Film(
            row.id,
            row.userId,
            row.title,
            row.isFavorite,
            row.watchDate,
            row.rating
          )
        );
    });
  });
}

/**
 * Retrieve all favorite films and return a Promise
 * that resolves to an array of Film objects
 */
function getFavorites() {
  return new Promise((resolve, reject) => {
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
}

/**
 * Retrieve films whose rating is greater than or equal to a
 * given number (received as a parameter).
 * Return a Promise that resolves to an array of Film objects
 */
function getBest() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM films WHERE rating >= 5";
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else {
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
      }
    });
  });
}

/**
 * Retrieve films that were seen within the last month.
 * Return a Promise that resolves to an array of Film objects
 */
function getRecentlyViewed() {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM films WHERE watchDate >= date('now', '-1 month')";
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else {
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
      }
    });
  });
}

/**
 * Retrieve films that don't have a watchDate value (unseen movies).
 * Return a Promise that resolves to an array of Film objects
 */
function getUnseen() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM films WHERE watchDate IS NULL";
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else {
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
      }
    });
  });
}

/**
 * Add a new film to the database.
 * Return a Promise that resolves to a number representing the id of the newly created film.
 */
function addFilm(film) {
  const { title, isFavorite, rating, watchDate, userId } = film;
  const sql =
    "INSERT INTO films (title, isFavorite, rating, watchDate, userId) VALUES (?,?,?,?,?)";
  db.run(sql, [title, isFavorite ? 1 : 0, rating, watchDate, userId], (err) => {
    if (err) reject(err);
    else resolve(film.id);
  });
}

/**
 * Delete the film with the specified id from the database.
 * Return a Promise that resolves to the id of the deleted film.
 */
function deleteFilm(id) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM films WHERE id=?";
    db.run(sql, [Number(id)], (err) => {
      if (err) reject(err);
      else resolve(id);
    });
  });
}

/**
 * Update the information of a film stored in the database.
 * Return a Promise that resolves to the id of the updated film.
 */
function updateFilm(film) {
  const { id, title, isFavorite, rating, watchDate } = film;
  const sql = "UPDATE films SET title=?, isFavorite=?, rating=?, watchDate=?";
  return new Promise((resolve, reject) => {
    db.run(sql, [title, isFavorite, rating, watchDate], (err) => {
      if (err) reject(err);
      else resolve(id);
    });
  });
}

export {
  getFilms,
  getFilm,
  getFavorites,
  getBest,
  getRecentlyViewed,
  getUnseen,
  addFilm,
  deleteFilm,
  updateFilm,
};

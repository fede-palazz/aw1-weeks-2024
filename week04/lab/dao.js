import { Film } from "./filmModel.js";
import sqlite from "sqlite3";

// open the database
const db = new sqlite.Database("films.db", (err) => {
  if (err) throw err;
});

/**
 * Retrieve the list of all the available films
 */
export const listFilms = () => {
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
};

/**
 * Retrieve a specific film
 */
export const getFilm = (id) => {
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
};

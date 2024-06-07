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
    try {
      const sql = "SELECT * FROM films";
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const films = rows.map(
          (f) => new Film(f.id, f.userId, f.title, f.isFavorite, f.watchDate, f.rating)
        );
        resolve(films);
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Retrieve a specific film
 */
function getFilm(id) {
  return new Promise((resolve, reject) => {
    try {
      const sql = "SELECT * FROM films WHERE id=?";
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        if (!row) {
          reject({ error: "Question not available, check the inserted id." });
          return;
        }
        resolve(new Film(row.id, row.userId, row.title, row.isFavorite, row.watchDate, row.rating));
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Retrieve all favorite films and return a Promise
 * that resolves to an array of Film objects
 */
function getFavorites() {
  return new Promise((resolve, reject) => {
    try {
      const sql = "SELECT * FROM films WHERE isFavorite=1";
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const films = rows.map(
          (film) =>
            new Film(
              film.id,
              film.userId,
              film.title,
              !!film.isFavorite,
              film.watchDate,
              film.rating
            )
        );
        resolve(films);
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Retrieve films whose rating is greater than or equal to a
 * given number (received as a parameter).
 * Return a Promise that resolves to an array of Film objects
 */
function getBest() {
  return new Promise((resolve, reject) => {
    try {
      const sql = "SELECT * FROM films WHERE rating >= 5";
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        } else {
          const films = rows.map(
            (film) =>
              new Film(
                film.id,
                film.userId,
                film.title,
                !!film.isFavorite,
                film.watchDate,
                film.rating
              )
          );
          resolve(films);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Retrieve films that were seen within the last month.
 * Return a Promise that resolves to an array of Film objects
 */
function getRecentlyViewed() {
  return new Promise((resolve, reject) => {
    try {
      const sql = "SELECT * FROM films WHERE watchDate >= date('now', '-1 month')";
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const films = rows.map(
          (film) =>
            new Film(
              film.id,
              film.userId,
              film.title,
              !!film.isFavorite,
              film.watchDate,
              film.rating
            )
        );
        resolve(films);
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Retrieve films that don't have a watchDate value (unseen movies).
 * Return a Promise that resolves to an array of Film objects
 */
function getUnseen() {
  return new Promise((resolve, reject) => {
    try {
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
                !!film.isFavorite,
                film.watchDate,
                film.rating
              )
          );
          resolve(films);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Add a new film to the database.
 * Return a Promise that resolves to a number representing the id of the newly created film.
 */
function addFilm(title, isFavorite, rating, watchDate, userId) {
  return new Promise((resolve, reject) => {
    try {
      let sql =
        "INSERT INTO films (title, isFavorite, rating, watchDate, userId) VALUES (?,?,?,?,?)";
      db.run(sql, [title, !!isFavorite ? 1 : 0, rating, watchDate, userId], function (err) {
        if (err) {
          reject(err);
          return;
        }
        // Get film id
        sql = `SELECT * from films WHERE title=?`;
        db.get(sql, [title], (err, row) => {
          if (err) {
            reject(err);
            return;
          }
          if (!row) {
            reject(new Error(`Film not found: ${title}`));
            return;
          }
          resolve(row.id);
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}
/**
 * Delete the film with the specified id from the database.
 * Return a Promise that resolves to the id of the deleted film.
 */
function deleteFilm(id) {
  return new Promise((resolve, reject) => {
    try {
      const sql = "DELETE FROM films WHERE id=?";
      db.run(sql, [id], function (err) {
        if (err) {
          reject(err);
          return;
        }
        if (this.changes === 0) {
          reject(new Error(`Film not found: ${id}`));
          return;
        }
        resolve(id);
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Update the information of a film stored in the database.
 * Return a Promise that resolves to the id of the updated film.
 */
function updateFilm(id, title, isFavorite, rating, watchDate) {
  return new Promise((resolve, reject) => {
    try {
      const sql = "UPDATE films SET title=?, isFavorite=?, rating=?, watchDate=? WHERE id=?";
      db.run(sql, [title, isFavorite ? 1 : 0, rating, watchDate, id], function (err) {
        if (err) {
          reject(err);
          return;
        }
        if (this.changes === 0) {
          reject(new Error(`Film not found: ${id}`));
          return;
        }
        resolve(id);
      });
    } catch (err) {
      reject(err);
    }
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

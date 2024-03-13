import dayjs from "dayjs";

function Film(id, personId = 1, title, favourite = false, watchDate, rating) {
  this.id = id;
  this.personId = personId;
  this.title = title;
  this.favourite = favourite;
  this.watchDate = watchDate ? dayjs(watchDate) : null;
  this.rating = rating;
}

function FilmLibrary() {
  this.films = [];
  this.addNewFilm = (film) => {
    this.films.push(film);
  };
  this.deleteFilm = (id) => {
    this.films = this.films.filter((film) => film.id !== id);
  };
  this.resetWatchedFilms = () => {
    this.films = this.films.map((film) => (film.watchDate = ""));
    //this.films = this.films.map((film) => (delete film.watchDate));
  };
  this.getRated = () =>
    this.films
      .filter((film) => film.rating)
      .sort((a, b) => b.rating - a.rating);
  this.sortByDate = () =>
    [...this.films].sort((a, b) =>
      !a.watchDate || (a.watchDate && a.watchDate.isAfter(b.watchDate)) ? 1 : -1
    );
  this.toString = () =>
    this.films.map((film) => ({
      ...film,
      watchDate: film.watchDate?.format("DD-MM-YYYY"),
    }));
}

// Film declaration
const films = [];
films.push(new Film(7, 1, "Fight Club", true, "2022-07-30", 3));
films.push(new Film(4, 1, "The Dark Knight", false, "2022-04-20", 4));
films.push(new Film(5, 2, "Forrest Gump", true, "2022-05-05", 1));
films.push(new Film(9, 3, "Titanic", true));
films.push(new Film(3, 3, "Pulp Fiction", true, "2022-03-10", 3));
films.push(new Film(6, 3, "The Matrix", false, "2022-06-18", 2));
films.push(new Film(2, 2, "The Shawshank Redemption", false, "2022-02-15", 4));
films.push(new Film(8, 2, "The Godfather", false, "2022-08-12", 4));
films.push(new Film(1, 1, "Inception", true, "2022-01-01", 5));
films.push(new Film(10, 1, "Avatar", false, "2022-10-08"));

// FilmLibrary instance
const library = new FilmLibrary();
// Add films to library
for (const film of films) library.addNewFilm(film);
// Print saved films
console.log("Initially saved films:");
// console.log(library.films);

// Test methods
console.log("\nFilms with a rating:");
console.log(library.getRated());
library.resetWatchedFilms();
console.log("\nFilms without watch date:");
console.log(library.films);
console.log("\nTo String visualization:");
console.log(library.toString());

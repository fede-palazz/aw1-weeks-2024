import { Film } from "./filmModel";

const FILMS = [
  new Film(1, 1, "Inception", true, "2022-01-01", 5),
  new Film(2, 2, "The Shawshank Redemption", false, "2022-02-15", 4),
  new Film(3, 3, "Pulp Fiction", true, "2022-03-10", 3),
  new Film(4, 1, "The Dark Knight", false, "2022-04-20", 4),
  new Film(5, 2, "Forrest Gump", true, "2024-05-05", 1),
  new Film(6, 3, "The Matrix", false, "2022-06-18", 2),
  new Film(7, 1, "Fight Club", true, "2022-07-30", 3),
  new Film(8, 2, "The Godfather", false, "2022-08-12", 4),
  new Film(9, 3, "Titanic", true),
  new Film(10, 1, "Avatar", false, "2022-10-08"),
];

export default FILMS;

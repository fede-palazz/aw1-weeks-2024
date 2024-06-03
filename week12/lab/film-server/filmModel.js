import dayjs from "dayjs";

function Film(id, userId = 1, title, isFavorite = false, watchDate, rating) {
  this.id = id;
  this.userId = userId;
  this.title = title;
  this.isFavorite = isFavorite;
  this.watchDate = watchDate ? dayjs(watchDate) : null;
  this.rating = rating;
}

export { Film };

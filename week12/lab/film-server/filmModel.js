import dayjs from "dayjs";

function Film(id, userId = 1, title, isFavorite = false, watchDate, rating) {
  this.id = Number(id);
  this.userId = Number(userId);
  this.title = title;
  this.isFavorite = !!isFavorite;
  this.watchDate = watchDate ? dayjs(watchDate) : null;
  this.rating = Number(rating);
}

export { Film };

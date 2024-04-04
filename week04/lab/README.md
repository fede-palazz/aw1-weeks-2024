# Lab 03

The `qa-server` is the server-side app companion for HeapOverrun. It presents some APIs to perform some CRUD operations on questions and their answers.

FilmLibrary is a simple application which tracks the films that a person wants to watch and
the ones they have already watched. Each film is represented by the following fields:

- `id`: A unique numerical id (*<u>mandatory</u>*)
- `title`: A title (*<u>mandatory</u>*)
- `isFavorite`: A Boolean value to represent whether the film is among the person’s favorites (*<u>default value: false</u>*)
- `watchDate`: A date corresponding to the date when the person watched the film (*<u>optional, it can be NULL</u>*)
- `rating`: A numerical value between 1 and 5 to represent the rating that the person has given to the film after watching it (*<u>optional, it can be NULL</u>*)
- A numerical id representing the person (*<u>mandatory, default to 1</u>*)

## APIs

Hereafter, we report the designed HTTP APIs, also implemented in the project.

- `GET /api/films`
  Retrieve the list of all the available films.

  Sample request: `GET /api/films`

  Sample response:

  ```json
  [
      {
          "id": 1,
          "title": "Pulp Fiction",
          "isFavorite": 1,
          "rating": 4,
          "watchDate": "2024-03-10",
          "userId": 1
      },
      ...
  ]
  ```

  Error responses:

  - `500 Internal Server Error`: generic error.

---

- `GET /api/films/<id>`
  Retrieve a specific film by passing its “id”.

  Sample request: `GET /api/films/1`

  Sample response:

  ```json
  {
  	"id": 1,
  	"title": "Pulp Fiction",
  	"isFavorite": 1,
  	"rating": 5,
  	"watchDate": NULL,
  	"userId": 3
  }
  ```

  Error responses:

  - `404 Not Found`: wrong film id.
  - `422 Unprocessable Entity`: id validation error.
  - `500 Internal Server Error`: generic error.

---

- `GET /api/films?filter=<filter>`
  Retrieve a list of all the films that fulfill one of the following filter values:

  - `favorite`: favorite films (*isFavorite=1*);
  - `best`: best films (those with a score of 5);
  - `recent`: films seen in the last month;
  - `unseen`: films without a specified "*watchDate*" value (i.e., it's `NULL`).

  Sample request: `GET /api/films?filter=unseen`

  Sample response:

  ```json
  [
      {
          "id": 1,
          "title": "Pulp Fiction",
          "isFavorite": 1,
          "rating": 5,
          "watchDate": NULL,
          "userId": 3
      },
      ...
  ]
  ```

  Error responses:

  - `422 Unprocessable Entity`: URL parameter validation error.
  - `500 Internal Server Error`: generic error.

---

- `POST /api/films`
  Create a new film.

  Sample request: `POST /api/films`

  ```json
  // Request body
  {
      "title": "Star Wars",
      "isFavorite": 0,
      "rating": 3,
      "watchDate": "2024-02-03",
  	"userId": 1
  }
  ```

  Sample response: created film id inside the response header.

  Error responses:

  - `422 Unprocessable Entity`: fields validation error.
  - `500 Internal Server Error`: generic error.

---

- `PUT /api/films/<id>`
  Update an existing film, by providing all of its information or just some fields.

  Sample request: `PUT /api/films/2`

  ```json
  // Request body
  {
      "title": "Star Wars",
      "isFavorite": 0,
      "rating": 3,
  }
  ```

  Sample response: None.

  Error responses:

  - `404 Not Found`: wrong film id.

  - `422 Unprocessable Entity`: fields validation error.
  - `500 Internal Server Error`: generic error.

---

- `DELETE /api/films/<id>`
  Delete an existing film by passing its "id".

  Sample request: `DELETE /api/films/2`

  Sample response: None.

  Error responses:

  - `404 Not Found`: wrong film id.

  - `500 Internal Server Error`: generic error.

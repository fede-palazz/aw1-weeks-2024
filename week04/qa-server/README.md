# `qa-server`

The `qa-server` is the server-side app companion for HeapOverrun. It presents some APIs to perform some CRUD operations on questions and their answers.

## APIs

Hereafter, we report the designed HTTP APIs, also implemented in the project.

### List all questions

URL: `/api/questions`

HTTP Method: `GET`

Description: Retrieve all questions.

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body:
```json
[
    {
        "id": 1,
        "text": "Is Javascript better than Python?",
        "email": "test@gmail.com",
        "date": "2024-02-07"
    },
    ...
]
```

## Get a single question

URL: `/api/questions/<id>`

HTTP Method: `GET`

Description: Retrieve the question represented by `<id>`.

Response: `200 OK` (success), `404 Not Found` (wrong id) or `500 Internal Server Error` (generic error).

Response body:

```json
{
    "id": 1,
    "text": "Is Javascript better than Python?",
    "email": "test@gmail.com",
    "date": "2024-02-07"
}
```

## Get all the answers of a single question

URL: `/api/questions/<id>/answers`

HTTP Method: `GET`

Description: Get all the answers of the question represented by `<id>`.

Response: `200 OK` (success), `404 Not Found` (wrong question id) or `500 Internal Server Error` (generic error).

Response body:

```json
[
    {
        "id": 1,
        "text": "Yes",
        "email": "test@gmail.com",
        "score": -10,
        "date": "2024-02-08"
    },
    ...
]
```

## Create a new answer for a given question

URL: `/api/questions/<id>/answers`

HTTP Method: `POST`

Description: Create a new answer to the question represented by `<id>`.

Request body:

```json
 {
     "text": "Yes",
     "email": "test@gmail.com",
     "score": -10,
     "date": "2024-02-08"
}
```

Response: `201 Created` (success, with the created id), `404 Not Found` (wrong question id), `422 Unprocessable Entity` (request body not valid) or `503 Service Unavailable` (generic error).

Response body: `None` (id will be sent back inside the response header).
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { body, param, query, validationResult } from "express-validator";
import * as dao from "./dao.js";

/* INIT */
const app = express();
const port = 3001;

/* MIDDLEWARES */
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
  })
);

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = "The parameters are not formatted properly\n\n";
    errors.array().forEach((e) => {
      error +=
        "- Parameter: **" +
        e.param +
        "** - Reason: *" +
        e.msg +
        "* - Location: *" +
        e.location +
        "*\n\n";
    });
    return res.status(422).json({ error: error });
  }
  return next();
}

/* ROUTES */

// GET /api/films
app.get(
  "/api/films",
  query("filter")
    .optional()
    .isIn(["favorites", "best", "recent", "unseen"])
    .withMessage('Filter must be one of "favorites", "best", "recent" or "unseen"'),
  query("searchTerm").optional().isString(),
  validateRequest,
  async (req, res) => {
    const filter = req.query?.filter || "";
    const searchTerm = req.query?.searchTerm || "";
    let films;
    switch (filter) {
      case "favorites":
        films = dao.getFavorites();
        break;
      case "best":
        films = dao.getBest();
        break;
      case "recent":
        films = dao.getRecentlyViewed();
        break;
      case "unseen":
        films = dao.getUnseen();
        break;
      default:
        films = dao.getFilms();
    }
    films
      .then((films) => {
        films = films.filter((film) => film.title.toLowerCase().includes(searchTerm));
        return res.status(200).json(films);
      })
      .catch((err) => {
        res.status(503).json({ error: err.message });
      });
  }
);

// GET /api/films/<id>
app.get("/api/films/:id", async (req, res) => {
  dao
    .getFilm(req.params.id)
    .then((film) => res.status(200).json(film))
    .catch((err) => {
      res.status(503).json({ error: err.message });
    });
});

// POST /api/films
app.post(
  "/api/films",
  body("title").notEmpty(),
  body("isFavorite").isBoolean(),
  body("rating").isInt({ min: 0, max: 5 }),
  body("watchDate")
    .optional({ checkFalsy: true })
    .isDate({ format: "YYYY-MM-DD", strictMode: true }),
  body("userId").isInt({ gte: 0 }),
  validateRequest,
  async (req, res) => {
    dao
      .addFilm(
        req.body.title,
        req.body.isFavorite,
        Number(req.body.rating),
        req.body.watchDate,
        Number(req.body.userId)
      )
      .then(() => res.status(200).end())
      .catch((err) => {
        res.status(503).json({ error: err.message });
      });
  }
);

// PUT /api/films/<id>
app.put(
  "/api/films/:id",
  param("id").isInt({ gte: 0 }),
  body("title").isString().notEmpty(),
  body("isFavorite").isBoolean(),
  body("rating").isInt({ min: 1, max: 5 }),
  body("watchDate").isDate({ format: "YYYY-MM-DD", strictMode: true }),
  validateRequest,
  async (req, res) => {
    dao
      .updateFilm(
        req.params.id,
        req.body.title,
        req.body.isFavorite,
        req.body.rating,
        req.body.watchDate
      )
      .then(() => res.status(200).end())
      .catch((err) => {
        res.status(503).json({ error: err.message });
      });
  }
);

// DELETE /api/films/<id>
app.delete("/api/films/:id", param("id").isInt({ gte: 0 }), validateRequest, async (req, res) => {
  dao
    .deleteFilm(req.params.id)
    .then(() => res.status(200).end())
    .catch((err) => {
      res.status(503).json({ error: err.message });
    });
});

app.listen(port, () => {
  console.log(`API server started at http://localhost:${port}`);
});

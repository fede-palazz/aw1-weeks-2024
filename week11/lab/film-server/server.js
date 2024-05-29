import express from "express";
import morgan from "morgan";
import cors from "cors";
import { check, query, validationResult } from "express-validator";
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
  validateRequest,
  async (req, res) => {
    try {
      const filter = req.query?.filter || "";
      let films;

      switch (filter) {
        case "favorites":
          films = await dao.getFavorites();
          break;
        case "best":
          films = await dao.getBest();
          break;
        case "recent":
          films = await dao.getRecentlyViewed();
          break;
        case "unseen":
          films = await dao.getUnseen();
          break;
        default:
          films = await dao.getFilms();
      }

      if (films.error) res.status(404).json(films.error);
      else res.json(films);
    } catch {
      res.status(500).end();
    }
  }
);

// GET /api/films/<id>
app.get("/api/films/:id", async (req, res) => {
  try {
    const film = await dao.getFilm(req.params.id);
    if (film.error) res.status(404).json(film.error);
    else res.json(film);
  } catch {
    res.status(500).end();
  }
});

// GET /api/films?filter=<filter>
app.get("/api/films/filter", async (req, res) => {
  // try {
  //   const answers = await listAnswersOf(req.params.id);
  //   res.json(answers);
  // } catch {
  //   res.status(500).end();
  // }
});

// POST /api/films
app.post(
  "/api/films",
  [
    check("title").notEmpty(),
    check("isFavorite").isBoolean(),
    check("rating").isInt({ min: 1, max: 5 }),
    check("watchDate")
      .optional({ nullable: true })
      .isDate({ format: "YYYY-MM-DD", strictMode: true }),
    validateRequest,
  ],
  async (req, res) => {
    //TODO:
  }
);

// PUT /api/films/<id>
app.put(
  "/api/films/:id",
  [
    check("title").notEmpty(),
    check("isFavorite").isNumeric(),
    check("rating").isNumeric(),
    check("score").isNumeric(),
    check("watchDate").isDate({ format: "YYYY-MM-DD", strictMode: true }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  }
);

// DELETE /api/films/<id>
app.post("/api/films/:id", async (req, res) => {
  // TODO: Check that id is numeric
  const answerId = req.params.id;
  try {
    const num = await voteAnswer(answerId, req.body.vote);
    if (num === 1) res.status(204).end();
    else throw new Error(`Error in casting a vote for answer #${answerId}`);
  } catch (e) {
    res.status(503).json({ error: e.message });
  }
});

app.listen(port, () => {
  console.log(`API server started at http://localhost:${port}`);
});

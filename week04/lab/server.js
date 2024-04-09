// import
import express from "express";
import morgan from "morgan";
import { check, validationResult } from "express-validator";
import * as dao from "./dao.js";

/* INIT */
const app = express();
const port = 3001;

/* MIDDLEWARES */
app.use(express.json());
app.use(morgan("dev"));

/* UTILITIES */
function isValidFilterParameter(param) {
  const filters = ["favorite", "best", "recent", "unseen"];
  return filters.includes(param);
}

/* ROUTES */

// GET /api/films
app.get("/api/films", async (req, res) => {
  // listQuestions()
  //   .then((questions) => res.json(questions))
  //   .catch(() => res.status(500).end());
});

// GET /api/films/<id>
app.get("/api/films/:id", async (req, res) => {
  try {
    const question = await getQuestion(req.params.id);
    if (question.error) res.status(404).json(question);
    else res.json(question);
  } catch {
    res.status(500).end();
  }
});

// GET /api/films?filter=<filter>
app.get("/api/films", async (req, res) => {
  // TODO: handle promise rejection
  // try {
  //   const answers = await listAnswersOf(req.params.id);
  //   res.json(answers);
  // } catch {
  //   res.status(500).end();
  // }
});

// POST /api/films
app.post(
  "/api/films", // TODO: allow NULL values for optional fields
  [
    check("title").notEmpty(),
    check("isFavorite").isNumeric(),
    check("rating").isNumeric(),
    check("score").isNumeric(),
    check("watchDate").isDate({ format: "YYYY-MM-DD", strictMode: true }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // const newAnswer = req.body;
    // const questionId = req.params.id;

    // try {
    //   const id = await addAnswer(newAnswer, questionId);
    //   res.status(201).location(id).end();
    // } catch (e) {
    //   console.error(`ERROR: ${e.message}`);
    //   res.status(503).json({ error: "Impossible to create the answer." });
    // }
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

    // const answerToUpdate = req.body;
    // answerToUpdate.id = req.params.id;

    // try {
    //   await updateAnswer(answerToUpdate);
    //   res.status(200).end();
    // } catch {
    //   res
    //     .status(503)
    //     .json({ error: `Impossible to update answer #${req.params.id}.` });
    // }
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

// far partire il server
// app.listen(port, () => {
//   console.log(`API server started at http://localhost:${port}`);
// });
dao.getFilm(1).then((f) => console.log(f));

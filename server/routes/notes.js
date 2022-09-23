const express = require("express");
const router = express.Router();
const {
  createNote,
  getNotes,
  getNote,
  deleteNote,
  updateNote,
} = require("../controllers/note.controller");

// GET all Notes
router.get("/", getNotes);

// GET a single Note
router.get("/:id", getNote);

// POST a new Note
router.post("/", createNote);

// DELETE a new Note
router.delete("/:id", deleteNote);

// UPDATE a new Note
router.patch("/:id", updateNote);

module.exports = router;

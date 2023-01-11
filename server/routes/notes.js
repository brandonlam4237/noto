const express = require("express");
const {
  createNote,
  getNotes,
  getNote,
  deleteNote,
  deleteAllNotes,
  updateNote,
} = require("../controllers/note.controller");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
// require auth for all note routes
router.use(requireAuth);

// GET all Notes
router.get("/", getNotes);

// GET a single Note
router.get("/:id", getNote);

// CREATE a new Note
router.post("/", createNote);

// DELETE a Note
router.delete("/:id", deleteNote);

// DELETE all Notes
router.delete("/", deleteAllNotes);

// UPDATE a Note
router.patch("/:id", updateNote);

module.exports = router;

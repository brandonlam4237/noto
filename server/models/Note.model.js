const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    title: { type: String, default: "untitled" },
    content: { type: String, default: "" },
    color: { type: String, default: "#fdd2d2" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);

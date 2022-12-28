const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    title: { type: String, default: "untitled" },
    content: { type: String, default: "" },
    color: { type: String, default: "#fdd2d2" },
    locked: { type: Boolean, default: false },
    password: { type: String, default: "" },
    user_id: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);

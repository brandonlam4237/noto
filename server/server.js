const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const notoRoutes = require("./routes/notes.js");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || process.env.LOCAL_PORT;
const uri = process.env.ATLAS_URI;

// middleware logger
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/notes", notoRoutes);

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

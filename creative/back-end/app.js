var express = require("express");
var path = require("path");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/story", {
  useNewUrlParser: true,
});

const storySchema = new mongoose.Schema({
  title: String,
  content: String,
  description: String,
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;

// app.listen(3000, () => console.log("Listening on port 3000"));

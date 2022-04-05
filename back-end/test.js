const express = require("express");
const bodyParser = require("body-parser");

// Configure multer so that it will upload to '../front-end/public/images'

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
});

const mongoose = require("mongoose");

// connect to the database
mongoose.connect("mongodb://localhost:27017/story", {
  useNewUrlParser: true,
});

// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  title: String,
  path: String,
  description: String,
});

// Create a model for items in the museum.
const Item = mongoose.model("Item", itemSchema);

const storySchema = new mongoose.Schema({
  title: String,
  path: String,
  description: String,
});

const Story = mongoose.model("Story", itemSchema);

app.post("/api/test", async (req, res) => {
  console.log("hello?");
  console.log(req.body);
});

// Create a new item in the museum: takes a title and a path to an image.
app.post("/api/items", async (req, res) => {
  const item = new Item({
    title: req.body.title,
    path: req.body.path,
    description: req.body.description,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
// app.post("/api/photos", upload.single("photo"), async (req, res) => {
//   // Just a safety check
//   if (!req.file) {
//     return res.sendStatus(400);
//   }
//   res.send({
//     path: "/images/" + req.file.filename,
//   });
// });

// Get a list of all of the items in the museum.
app.get("/api/items", async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete("/api/items/:id", async (req, res) => {
  try {
    let itemToDelete = await Item.findOne({
      _id: req.params.id,
    });
    const fs = require("fs");

    const path = "../front-end/public" + itemToDelete.path; // Get the path from the item object.
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    await Item.deleteOne({
      _id: req.params.id,
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put("/api/items/:id", async (req, res) => {
  try {
    let item = await Item.findOne({
      _id: req.params.id,
    });
    // console.log(`title is ${req.body.title}`)
    item.title = req.body.title;
    item.description = req.body.description;
    item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3001, () => console.log("Server listening on port 3001!"));

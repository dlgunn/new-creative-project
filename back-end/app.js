var express = require("express");
var path = require("path");
const bodyParser = require("body-parser");

// mongodb+srv://storywriter:<password>@cluster0.xhfyt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");

var app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

// app.use(express.static(path.join(__dirname, "public")));

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/story", {
  useNewUrlParser: true,
});

const commentSchema = new mongoose.Schema({
  name: String,
  comment: String,
  upvotes: Number,
});

const partSchema = new mongoose.Schema({
  date: String,
  content: [],
  comments: [commentSchema],
  upvotes: Number,
  downvotes: Number,
});

const storySchema = new mongoose.Schema({
  title: String,
  parts: [partSchema],
});

const dataSchema = new mongoose.Schema({
  stories: [storySchema],
});

const Data = mongoose.model("Data", dataSchema);
// const Story = mongoose.model("Story", storySchema);
// const data = new Data({
//   stories: [
//     {
//       title: "TestStoryTitle",
//       parts: [
//         {
//           date: "Jan 10, 2002",
//           content: ["Test paragraph"],
//           comments: [
//             {
//               name: "Test name",
//               comment: "Test comment content",
//               upvotes: 12,
//             },
//           ],
//           upvotes: 33,
//           downvotes: 2,
//         },
//       ],
//     },
//   ],
// });

// console.log(data);
// data.save();

app.get("/api/data", async (req, res) => {
  try {
    let data = await Data.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/api/data/:storyid/:sectionid", async (req, res) => {
  try {
    let newComment = {
      name: req.body.name,
      comment: req.body.comment,
      upvotes: req.body.upvotes,
    };
    await Data.updateOne(
      { "stories.parts._id": req.params.sectionid },
      { $push: { "stories.$[n].parts.$[m].comments": newComment } },
      {
        arrayFilters: [
          { "n._id": req.params.storyid },
          { "m._id": req.params.sectionid },
        ],
      }
    );
    // item.save();
    // console.log(newComment);
    // let document = await Data.find();
    // console.log(`document is ${document}`);
    // console.log(story);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
  const data = new Data({
    stories: [],
  });
});

app.post("/api/data/:storyid/:sectionid/:commentid", async (req, res) => {
  try {
    await Data.updateOne(
      { "stories.parts.comments.commetn._id": req.params.commentid },
      { $inc: { "stories.$[n].parts.$[m].comments.$[q].comment": 1 } },
      {
        arrayFilters: [
          { "n._id": req.params.storyid },
          { "m._id": req.params.sectionid },
          { "q._id": req.params.commentid },
        ],
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// app.post("/api/test", async (req, res) => {
//   console.log("hello");
//   console.log(`the request is ${req.body.name}`);
//   const story = new Story({
//     name: req.body.name,
//   });
//   try {
//     await story.save();
//     console.log("now sending");
//     res.send(story);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

module.exports = app;

// app.listen(3000, () => console.log("Listening on port 3000"));
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const Todo = require("./schema.js");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("views", "views");
mongoose.connect("mongodb://localhost:27017/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log(" database connected");
});

app.get("/", async (req, res) => {
  try {
    var totalTodos = await Todo.countDocuments();
    // console.log(totalTodos)
    var SingleTodo = await Todo.find({});
    // console.log(SingleTodo)
    // console.log(SingleTodo)
    res.render("index", { totalTodos, SingleTodo });
  } catch (e) {
    console.log(e);
  }
});
app.get("/newTodo", (req, res) => {
  res.render("form");
});

app.post("/newTodo", async (req, res) => {
  try {
    const { todo, description } = req.body;
    const newTodo = new Todo({
      name: todo,
      description: description,
    });
    await newTodo.save();
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
});

app.post("/:id", async (req, res) => {
  try {
    id = req.params.id;
    await Todo.deleteOne({ _id: id });
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
});

// app.delete('/', (req,res)=>{

// })

app.listen(3000, () => {
  console.log("Were connected on localhost 3000");
});

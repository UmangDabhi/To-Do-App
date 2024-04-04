const moment = require("moment");
const Todo = require("../models/Todo");

const homeController = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.locals.moment = moment;
    res.render("index", { todos });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
const addTodoFormController = async (req, res) => {
  try {
    res.render("newTodo");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
const updateTodoFormController = async (req, res) => {
  try {
    const { id } = req.query;
    const todo = await Todo.findById(id);
    res.render("updateTodo", { todo: todo });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
const deleteTodoPageContoller = async (req, res) => {
  try {
    const { id } = req.query;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo Not Found" });
    }
    console.log(todo._id);
    res.render("deleteTodo", { todo: todo });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const addTodoController = async (req, res, next) => {
  try {
    const { title, desc } = req.body;
    const newTodo = new Todo({ title, desc });
    await newTodo.save();

    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
const updateTodoController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo Not Found" });
    }

    todo.title = title;
    todo.desc = desc;
    await todo.save();

    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
const deleteTodoController = async (req, res) => {
  try {
    const { id, confirm } = req.query;

    if (confirm === "yes") {
      await Todo.findByIdAndDelete(id);
    }
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  homeController,
  addTodoFormController,
  updateTodoFormController,
  deleteTodoPageContoller,
  addTodoController,
  updateTodoController,
  deleteTodoController,
};

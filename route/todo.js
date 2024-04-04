const express = require("express");
const Todo = require("../controllers/todo");
const router = express.Router();

router.get("/", Todo.homeController);
router.get("/add-todo", Todo.addTodoFormController);
router.get("/update-todo", Todo.updateTodoFormController);
router.get("/delete-todo", Todo.deleteTodoPageContoller);

router.post("/add-todo", Todo.addTodoController);
router.post("/update-todo/:id", Todo.updateTodoController);
router.get("/confirm-delete", Todo.deleteTodoController);

module.exports = router;

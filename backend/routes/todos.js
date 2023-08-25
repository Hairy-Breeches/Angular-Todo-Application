const express = require("express");
const router = express.Router();

const todoControllers = require("../controllers/todos");
const checkAuth = require("../middleware/checkAuth");

router.post("/create-todo", checkAuth, todoControllers.createTodo);

router.get("/get-todos", checkAuth, todoControllers.getTodo);

router.put("/todo-check", checkAuth, todoControllers.editTodo);

router.delete("/todo-delete", checkAuth, todoControllers.deleteTodo);

module.exports = router;

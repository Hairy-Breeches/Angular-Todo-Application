const Todo = require("../models/todo");

exports.createTodo = (req, res) => {
  const todo = new Todo({
    todo: req.body.todo,
    checked: false,
    creator: req.decodedToken.id,
  });

  todo
    .save()
    .then((document) => {
      res.status(201).json({
        message: "Successfully posted the todo!",
        todo: document,
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "server failed to create Todo!",
      });
    });
};

exports.getTodo = (req, res) => {
  Todo.find({ creator: req.decodedToken.id })
    .then((documents) => {
      res.status(200).json({
        message: "successfully fetched todos!",
        todos: documents,
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "server failed to get Todos!",
      });
    });
};

exports.editTodo = (req, res) => {
  Todo.updateOne(
    { _id: req.query.id, creator: req.decodedToken.id },
    { checked: req.body.checked, _id: req.body.todoItem.id }
  )
    .then((document) => {
      res.status(200).json({
        message: "Successfully edited the todo!",
        todo: document,
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "server failed to edit Todo!",
      });
    });
};

exports.deleteTodo = (req, res) => {
  Todo.deleteOne({ _id: req.query.id, creator: req.decodedToken.id })
    .then((result) => {
      if (result.deletedCount) {
        res.status(202).json({
          message: "Successfully deleted todo!",
        });
      } else {
        res.status(401).json({ message: "Not Authorized!" });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "server failed to create!",
      });
    });
};

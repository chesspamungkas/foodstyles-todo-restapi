const db = require("../models");

const Todos = db.todos;

// Create and Save a new Todo
exports.createTodo = (req, res) => {
  // Validate request
  if (!req.body.description) {
    res.status(400).send({
      message: "Todo can not be empty!"
    });
    return;
  }

  // Create a Todo
  const todos = {
    description: req.body.description,
    completed: req.body.completed ? req.body.completed : false
  };

  // Save Todo in the database
  Todos.create(todos)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Todos."
      });
    });
};

// Mark a Todo Completed by the id in the request
exports.markTodoCompleted = (req, res) => {
    const { id } = req.params;
  
    Todos.update(req.body, {
        where: { id: id }
        })
        .then(num => {
            if (num == 1) {
            res.send({
                message: "Todo was mark completed."
            });
            } else {
            res.send({
                message: `Cannot update Todo with id=${id}. Maybe Todo was not found or req.body is empty!`
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message: "Error updating Todo with id=" + id
            });
        });
  
};

// Mark a Todo Uncompleted by the id in the request
exports.markTodoUncompleted = (req, res) => {
    const { id } = req.params;
  
    Todos.update(req.body, {
        where: { id: id }
        })
        .then(num => {
            if (num == 1) {
            res.send({
                message: "Todo was mark uncompleted."
            });
            } else {
            res.send({
                message: `Cannot update Todo with id=${id}. Maybe Todo was not found or req.body is empty!`
            });
            }
        })
        .catch(err => {
            res.status(500).send({
            message: "Error updating Todo with id=" + id
            });
        });
  
};

// Delete a Todo with the specified id in the request
exports.deleteTodo = (req, res) => {
    const { id } = req.params;

    Todos.destroy({
        where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Todo was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Todo with id=" + id
      });
    });
};

// Retrieve all Todos from the database
exports.listTodos = (req, res) => {
    Todos.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving todos."
      });
    });
};
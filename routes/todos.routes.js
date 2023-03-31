const { authJwt } = require("../middleware");
const todos = require("../controllers/todos.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Create a new Todo
    app.post("/api/todos/create", [authJwt.verifyToken], todos.createTodo);

    // Update a Todo with id completed
    app.put("/api/todos/completed/:id", [authJwt.verifyToken], todos.markTodoCompleted);

    // Update a Todo with id uncompleted
    app.put("/api/todos/uncompleted/:id", [authJwt.verifyToken], todos.markTodoUncompleted);

    // Delete a Todo with id
    app.delete("/api/todos/delete/:id", [authJwt.verifyToken], todos.deleteTodo);

    // Retrieve all Todos
    app.get("/api/todos/list", [authJwt.verifyToken], todos.listTodos);
};
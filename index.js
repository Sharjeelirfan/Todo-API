import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "https://todo-with-backend-three.vercel.app",
    ],
  })
);

const PORT = 3000;

let todos = [];
let idNum = 1;

app.use(express.json());

app.get("/todos", (req, res) => {
  res.send({ data: todos });
});

app.post("/add-todo", (req, res) => {
  let addTodo = {
    todo: req.body.todo,
    id: idNum++,
  };
  todos.push(addTodo);
  res.send({ message: "Todo added successfully", data: addTodo });
});

let fountTodo = null;
app.get("/get-todo/:id", (req, res) => {
  const id = Number(req.params.id);
  let isFound = false;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      fountTodo = todos[i];
      isFound = true;
      break;
    }
  }
  if (isFound) {
    res.send({ message: "Todo found successfully", data: fountTodo });
  } else {
    res.status(200).send({ data: null, message: "todo not found" });
  }
});

app.delete("/delete-todo/:id", (req, res) => {
  res.send("Todo deleted successfully");
});

app.patch("/edit-todo/:id", (req, res) => {
  const id = req.params.id;
  let isFound = false;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].todo = req.body.todo;

      isFound = true;
      break;
    }
  }
  if (isFound) {
    res.send("Todo edited successfully" + id);
  } else {
    res.status(200).send({ data: null, message: "todo not found" });
  }
  // res.send("Todo edited successfully" + id);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

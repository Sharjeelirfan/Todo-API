// import express from "express";
// import cors from "cors";
// import "./database.js";
// import { Todo } from "./models/index.js";
// const app = express();
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://todo-with-backend-three.vercel.app",
//     ],
//   })
// );
// const PORT = process.env.PORT || 3000;

// let todos = [];
// let idNum = 1;

// app.use(express.json());

// app.get("/todos", (req, res) => {
//   res.send({ data: todos });
// });

// app.post("/add-todo", (req, res) => {
//   let addTodo = {
//     todo: req.body.todo,
//     id: idNum++,
//   };
//   todos.push(addTodo);
//   res.send({ message: "Todo added successfully", data: addTodo });
// });

// app.delete("/delete-todo/:id", (req, res) => {
//   const id = Number(req.params.id);
//   let isFound = false;
//   for (let i = 0; i < todos.length; i++) {
//     if (todos[i].id === id) {
//       todos.splice(i, 1);
//       isFound = true;
//       break;
//     }
//   }
//   if (isFound) {
//     res.status(201).send({ message: "Todo delete successfully" });
//   } else {
//     res.status(200).send({ data: null, message: "todo not found" });
//   }
// });

// // app.delete("/delete-todo/:id", (req, res) => {
// //   res.send("Todo deleted successfully");
// // });

// app.patch("/edit-todo/:id", (req, res) => {
//   const id = req.params.id;
//   let isFound = false;

//   for (let i = 0; i < todos.length; i++) {
//     if (todos[i].id === id) {
//       todos[i].todo = req.body.todo;

//       isFound = true;
//       break;
//     }
//   }
//   if (isFound) {
//     res.send("Todo edited successfully" + id);
//   } else {
//     res.status(200).send({ data: null, message: "todo not found" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import express from "express";
import cors from "cors";
import "dotenv/config";
import "./database.js";
import { Todo } from "./models/index.js";

const app = express();
const port = process.env.PORT || 3900;

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://todo-with-backend-three.vercel.app",
    ],
  })
);

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find({}, { __v: 0, updatedAt: 0 }).sort({
      _id: -1,
    });
    res.send({
      data: todos,
      message: todos.length ? "Todos retrieved" : "No todos found",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching todos");
  }
});

// Add a new todo
app.post("/add-todo", async (req, res) => {
  try {
    const newTodo = await Todo.create({
      todoContent: req.body.todo,
      ip: req.ip,
    });
    res.send({ message: "Todo added successfully", data: newTodo });
  } catch (error) {
    console.error(error);
    res.status(400).send("Error adding todo");
  }
});

// Delete a todo
app.delete("/delete-todo/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (deletedTodo) {
      res.send({ message: "Todo deleted successfully", data: deletedTodo });
    } else {
      res.status(404).send({ message: "Todo not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting todo");
  }
});

// Edit a todo
app.patch("/edit-todo/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { todoContent: req.body.todo },
      { new: true }
    );
    if (updatedTodo) {
      res.send({ message: "Todo updated successfully", data: updatedTodo });
    } else {
      res.status(404).send({ message: "Todo not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating todo");
  }
});

// Default route
app.use((req, res) => {
  res.status(404).send({ message: "Route not found!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

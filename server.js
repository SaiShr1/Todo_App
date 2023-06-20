const express = require("express");
const fs = require("fs/promises");
const utils = require("./utils/utils");
const todoRouter = require("./routes/todos.routes");
const viewRouter = require("./routes/views.routes");
const authRouter = require("./routes/auth.routes");
const middlewares = require("./middlewares/index");

//initiliaze the express app
const app = express();

// set view engine

// mounting view engine to get extra capability of using EJS
// setting the view engine of express app to ejs (by default it is HTML)
app.set("view engine", "ejs")

// middleware #1
// making logger
// app.user() having no path "" but has a function
// using a function in it makes it a middleware
app.use(middlewares.logger)

// middleware #2
// **VERY IMP - this is used to collect data from req.body in chunks
// without this the body parsing would be undefined in the POST calls
app.use(express.json());

//hello world API call for our serve
app.get("/greetings", (req, res) => {
  return res.send("Greetings from TODO App.");
});

// view routers
app.use("/", viewRouter)

// app.use("/todos", todoRouter);

// API ROUTERS

// THIS IS BASE URL
// http://localhost:3000/todos

// app.use("/todos", todoRoute.router) // if using const todoRoute = require() along with module.exports = { router: todoRouter }
app.use("/api/todos", todoRoute) // if module.exports = todoRouter
app.use("/api/v1/auth", authRouter) 

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

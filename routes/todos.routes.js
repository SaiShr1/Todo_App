const express = require("express");
const utils = require("../utils/utils");
const fs = require("fs/promises");
const { body, validationResult} = require("express-validator")
const {isAuthenticated } = require("../middlewares")

// calling function express.Router() which is used to channelise all the routers
const todoRouter = express.Router();

// http://localhost:3000/api/todos
todoRouter.get("/", (req, res) => {
    //return res.send("TODOs list feteched successfully.")
    return utils.readData()
        .then((data) => {
            return res.status(200).json({
                message: "TODOs list feteched successfully.",
                data,
                error: null
            });
        });
    });

// http://localhost:3000/api/todos 
todoRouter.post(
    "/", 
    isAuthenticated,
    body("title").custom((title) => {
        if (typeof title === "string" && title.length >= 3 ) {
            return true
        }
        return false
    }) .withMessage("Title shoild be be string and length greater than 3 or equal"),
    body("completed").custom((completed)=>{
        if (typeof completed === "boolean") {
            return true
        }
        return false
    }) .withMessage("Completed should be true or false"),
    (req, res) => {
        const newTodo = req.body;
        console.log("---body---", newTodo)
        
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log("---body---", errors.array())

            return res.status(400).json({
                message: "Todo creation failed.",
                error: errors.array(),
                data:{}
            })
        }


         return utils.readData()
            .then((data) => {
                data.push(NewTodo);
                 return fs.writeFile("db.json", JSON.stringify(data));
            })
            .then(() => {
                return res.status(201)
                    .json({
                        message: "TODO added successfully.",
                        data: NewTodo,
                        error: null,
                    })
         })
         .catch((error) => {
            return res.status(500)
                .json({
                    message: "Todo creation failed.",
                    data: {},
                    error: error.message ? error.message : error.toString()
                })
         })
    })

// /GET specific todo
todoRouter.get("/:title", (req, res) => {
    const title = req.params.title.toLowerCase()

    return utils.readData()
        .then((dataArr) => {
            const todoObj = dataArr.find
                (
                    (todo) => {
                        return todo.title === title
                    }
                )

            return res.status(200)
                .json({
                    message: "TODO fetched successfully.",
                    data: todoObj,
                    error: null,
                })

        })

})

todoRouter.put("/:title", (req, res) => {
    const title = req.params.title.toLowerCase()
    const updateTodo = req.body

    return utils.readData()
        .then((dataArr) => {
            const idx = dataArr.findIndex(
                (todo) => {
                    return todo.title === title
                })
            console.log(idx)
            if (idx != -1) {
                dataArr[idx] = {
                    ...dataArr[idx],
                    ...updateTodo
                }
            }

            return fs.writeFile("db.json", JSON.stringify(dataArr))
        })
        .then(() => {
            return res.status(200)
                .json({
                    message: "TODO updated successfully.",
                    data: updateTodo,
                    error: null,
                })
        })
})

todoRouter.delete("/:title", (req, res) => {
    const title = req.params.title.toLowerCase()
    let deletedObj

    return utils.readData()
        .then((dataArr) => {
            const idx = dataArr.findIndex
                (
                    (todo) => {
                        return todo.title === title
                    }
                )

            if (idx != -1) {
                deletedObj = dataArr.splice(idx, 1)
            }
            return fs.writeFile("db,json", JSON.stringify(dataArr))
        })
        .then(() => {
            return res.status(200)
            .json({
                message: "Todo deteled successfully.",
                data: daleteObj,
                error: null
            })
        })
})
module.exports = todoRouter
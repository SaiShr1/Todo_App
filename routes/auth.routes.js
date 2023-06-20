const { name } = require('ejs')
const e = require('express')
const express = require('express')
const router = express.Router()

const USER = []

router.post("/register",
    body("name")
        .custom((name) => {
            if (typeof name === "string" && name.length >= 5) {
                return true
            }
            else false
        })
        .withMessage("Name shoulde be of minimum 5 characters."),

    body("email")
        .isEmail()
        .withMessage("Please enter a valid email address."),

    body("password")
        .isLength({ min: 8 })
        .withMessage("Password should be of minimum 8 characters."),

    (req, res) => {

        const { name, email, password } = req.body

        console.log("---user info---", name, email, password)

        USER.push(
            {
                name,
                email,
                password,
            })

        return res.status(201).json({
            message: "User Registered in successfully.",
            error: null,
            data: {}
        })
    })

    router.post("/loginn", (req, res) =>{
        const { email, password } = req.body

        console.log("---user info---", email, password);

        if (USER.length <=0){
            return res.status(400)
            .json({
                message: "User login failed.",
                error:"User does not exists.",
                data: {}
            })
        }

            // this is not a very good approach due to nesting of lots of if conditions
    // else if (USER.find(user => user.email === email){
    //     if(password)
    // })

        const userIndex = USER.findIndex((user) => user.email === email)
        if(userIndex === -1){
            return res.status(400)
            .json({
                message: "User login failed.",
                error:"User does not exists.",
                data: {}
            })
        }

        if(USER[userIndex].password !== password){
            return res.status(400)
            .json({
                message: "User login failed.",
                error:"Password is incorrect.",
                data: {}
            })
        }

        // create access tokens
        // create refresh tokens

        const token = JWT.sign({ email }, SECRET)

        return res.status(200)
        .json({
            message: "User login successfully.",
            error:null,
            data: {
                token,
            }
        })
    })
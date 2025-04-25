const { Router } = require("express")
const api = Router()

const loginRouter = require("./login")
const signUpRouter = require("./signup")
const postRouter = require("./post")

api.use("/login", loginRouter)
api.use("/sign-up", signUpRouter)
api.use("/posts", postRouter)

module.exports = api
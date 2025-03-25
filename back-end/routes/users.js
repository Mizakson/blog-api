const { Router } = require("express")
const usersRouter = Router()
const usersController = require("../controllers/usersController")

usersRouter.post("/sign-up", usersController.validateUser, usersController.createUser)

usersRouter.post("/login", usersController.loginUser)

module.exports = usersRouter
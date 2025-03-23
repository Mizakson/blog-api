const { Router } = require("express")
const usersRouter = Router()
const usersController = require("../controllers/usersController")

usersRouter.get("/sign-up", usersController.signUpGet)
usersRouter.post("/sign-up", usersController.signUpPost)

module.exports = usersRouter
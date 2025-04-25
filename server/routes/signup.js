const { Router } = require("express")
const router = Router()
const signUpController = require("../controllers")

router.post("/", signUpController.signupPost)

module.exports = router
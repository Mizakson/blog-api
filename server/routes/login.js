const { Router } = require("express")
const router = Router()
const loginController = require("../controllers")

router.post("/", loginController.loginPost)

module.exports = router
const { Router } = require("express")
const apiRouter = Router()

apiRouter.get("/hello", (req, res) => {
    res.json({ message: "hi from apiRouter..." })
})

module.exports = apiRouter
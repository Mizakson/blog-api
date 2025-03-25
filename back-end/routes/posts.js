require("dotenv").config()
const { Router } = require("express")
const postsRouter = Router()
const jwt = require("jsonwebtoken")
const middleware = require("../middleware/middleware")

postsRouter.post("/", middleware.verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, data) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.status(200).json({
                message: "You made it to the protected route :)",
                data,
            })
        }
    })

})

module.exports = postsRouter
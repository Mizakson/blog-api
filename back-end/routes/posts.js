require("dotenv").config()
const { Router } = require("express")
const postsRouter = Router()
const jwt = require("jsonwebtoken")
const middleware = require("../middleware/middleware")

postsRouter.post("/", middleware.verifyToken, (req, res) => {


    if (req.role === "AUTHOR") {
        jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, data) => {
            if (err) {
                res.json({ error: err.message })
            } else {
                res.status(200).json({
                    message: "You made it to the protected route :)",
                    data,
                })
            }
        })
    }

    if (req.role !== "AUTHOR") {
        res.status(403).json({ message: "You have a BASIC role, not an author role!" })
    }

    // jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, data) => {
    //     if (err) {
    //         res.json({ error: err.message })
    //     } else {
    //         res.status(200).json({
    //             message: "You made it to the protected route :)",
    //             data,
    //         })
    //     }
    // })

})

module.exports = postsRouter
require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const app = express()

const jwt = require("jsonwebtoken")
// const passport = require("passport")
// const jwtStrategy = require("./config/auth")
// passport.use(jwtStrategy)

// routes here
const usersRouter = require("../back-end/routes/users")

app.use(express.static(path.join("/home/mizakson/repos/blog-api/", "front-end/html")))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// router use statements here
app.use("/users", usersRouter)

app.get("/", (req, res) => {
    res.status(200).send({
        message: "API HOMEPAGE..."
    })
})

const PORT = 3000
app.listen(PORT, "0.0.0.0", () => {
    console.log(`listening on http://localhost:${PORT}`)
})
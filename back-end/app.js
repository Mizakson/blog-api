require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const indexRouter = require("../back-end/routes/indexRouter")

app.use("/", indexRouter)
// app.use("/sign-up", signUpRouter)
// app.use("login", loginRouter)

const PORT = 3000
app.listen(PORT, "0.0.0.0", () => {
    console.log(`listening on http://localhost:${PORT}`)
})
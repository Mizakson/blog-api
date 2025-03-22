require("dotenv").config()
const express = require("express")

const app = express()

const indexRouter = require("../back-end/routes/indexRouter")

app.use("/", indexRouter)

const PORT = 3000
app.listen(PORT, "0.0.0.0", () => {
    console.log(`listening on http://localhost:${PORT}`)
})
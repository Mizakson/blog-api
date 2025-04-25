require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const apiRouter = require("./routes/index")

app.use("/api", apiRouter)
app.use("/", (err, req, res, next) => {
    if (err) return res.status(500).json({ success: false, message: "Internal server error" })
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on http://localhost:${process.env.PORT}`)
})
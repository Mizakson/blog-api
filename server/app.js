require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/api/hello", (req, res) => {
    res.json({ message: "hi from the server" })
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on http://localhost:${process.env.PORT}`)
})
require("dotenv").config()
const express = require("express")

const app = express()

app.get("/", (req, res) => {
    res.send("TEST...")
})

const PORT = 3000
app.listen(PORT, "0.0.0.0", () => {
    console.log(`listening on http://localhost:${PORT}`)
})
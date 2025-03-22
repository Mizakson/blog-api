const { Router } = require("express")

const indexRouter = Router()

indexRouter.get("", (req, res) => {
    res.json({
        message: "sent from indexRouter"
    })
})

module.exports = indexRouter
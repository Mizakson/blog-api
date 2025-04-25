const passport = require("passport")

const checkRole = (requiredRole) => (req, res, next) => {
    if (req.user) {
        if (requiredRole === req.user.role || req.user.role === "AUTHOR") {
            return next()
        } else {
            return res.status(403).json({ success: false, message: "Forbidden" })
        }
    } else {
        next()
    }
}

const jwtAuth = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, userInfo) => {
        if (err) {
            return next(err)
        }
        if (userInfo) {
            return res.status(401).json({ success: false, message: userInfo.message })
        }
        if (!user) {
            return res.status(401).json({ success: false, message: "Login" })
        }

        req.user = user
        next()
    })(req, res, next)
}

module.exports = { checkRole, jwtAuth }
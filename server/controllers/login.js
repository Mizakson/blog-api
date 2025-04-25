const { userExists, verifyUser } = require("../auth/auth")
const { issueToken } = require("../utils")

const loginPost = async (req, res, next) => {
    const { username, password } = req.body

    try {
        const user = await userExists(username)
        if (!user) {
            return res.status(400).json({ success: false, validationErrors: "User not found" })
        }

        const result = await verifyUser(user, password)
        if (!result) {
            return res.status(400).json({ success: false, validationErrors: "Incorrect password" })
        }

        const tokenObj = issueToken(user)
        return res.status(200).json({
            success: true,
            token: tokenObj.token,
            expiresIn: tokenObj.expiresIn,
            user: username,
            userRole: user.role
        })

    } catch (error) {
        next(error)
    }
}

module.exports = { loginPost }
const { validationResult } = require("express-validator")
const { userExists, signUpUser } = require("../auth/auth")
const { validateUser } = require("../utils")

const signupPost = [
    validateUser,
    async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, validationErrors: errors.array() })
        }

        try {
            const { username, password } = req.body
            if (await userExists(username)) {
                return res.status(400).json({ success: false, validationErrors: "User exists" })
            }

            const user = await signUpUser(username, password)
            if (user) {
                return res.status(200).json({ success: true, user: user })
            }
        } catch (error) {
            next(error)
        }
    }


]

module.exports = { signupPost }
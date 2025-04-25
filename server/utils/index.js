const bcrypt = require("bcryptjs")

// PASSWORD AND FORM VALIDATION HELPER FUNCTIONS

const hashPw = async (password) => {
    return await bcrypt.hash(password, 10)
}

const validatePw = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

const { body } = require("express-validator")

const validateUser = [
    body("username").trim().notEmpty().withMessage("Enter a username").isLength({ min: 4, max: 15 }).withMessage("Username must be between 4 and 15 characters"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 character"),
    body("confirmPassword").trim().custom((confirmPassword, { req }) => { return confirmPassword === req.body.password }).withMessage("Passwords must match")
]

const validatePost = [
    body("title").trim().notEmpty().withMessage("Add a title to the post"),
    body("text").trim().notEmpty().withMessage("Add text to the post"),
    body("state").trim().custom((state) => {
        return state === "PUBLISHED" || state === "UNPUBLISHED"
    }).withMessage("Invalid state (PUBLISHED or UNPUBLISHED)") // can also use a select dropdown? maybe
]

const validateComment = [
    body("text").trim().notEmpty().withMessage("Add text to the comment")
]

const jsonwebtoken = require("jsonwebtoken")

const issueToken = (user) => {
    const username = user.username
    const expiresIn = "14d"
    const payload = {
        sub: username,
        iat: Date.now(),
    }

    const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn })

    return { token: "Bearer " + signedToken, expiresIn: expiresIn }
}

module.exports = {
    hashPw,
    validatePw,
    validateUser,
    validatePost,
    validateComment,
    issueToken
}
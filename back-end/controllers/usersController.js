require("dotenv").config()
const queries = require("../utils/queries")
const bcrypt = require("bcryptjs")
const { validationResult, body } = require("express-validator")
const jwt = require("jsonwebtoken")

exports.validateUser = [
    body("username").isAlpha().notEmpty().withMessage("Please enter a username"),
    body("email").isEmail().notEmpty().withMessage("Please enter an email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be a minimum length of 6 characters"),
    body("confirmPassword").custom((value, { req }) => value === req.body.password).withMessage("Passwords must match")
    // role will be a dropdown
]

exports.createUser = async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation failure",
            errors: errors.array()
        })
    }

    try {
        const { username, email, password, role } = req.body
        const hashedPw = await bcrypt.hash(password, 10)
        const newUser = queries.createUser({
            name: username,
            email: email,
            password: hashedPw,
            role: role
        })
    } catch (error) {
        console.error("An error occured while creating a user", error)
        res.status(500).json({
            message: "User creation error",
            error: error.message
        })
    }
}

exports.loginUser = async function (req, res) {

    const { email, password } = req.body

    try {

        // will check if password matches using bcrypt compare

        const user = await queries.getUserByEmail(email)

        if (user) {
            match = await bcrypt.compare(password, user.password)

            if (match) {
                jwt.sign({ user }, process.env.JWT_SECRET_KEY, (err, token) => {
                    res.status(200).json({
                        message: "Auth success",
                        token,
                    })
                })
            } else {
                res.json({
                    message: "Incorrect password"
                })
            }
        }

    } catch (err) {
        console.error(err, err.message)
        res.status(401).json({ message: "Auth failed" })
    }


}
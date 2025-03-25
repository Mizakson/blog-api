require("dotenv").config()
const { Prisma } = require("@prisma/client")
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
    let { email, password } = req.body
    const emailLookup = await queries.getUserByEmail(email)

    if (!emailLookup) {
        res.status(400).json({ message: "User not found" })
    }

    if (emailLookup) {
        const match = bcrypt.compare(password, emailLookup.password)
        if (match) {
            const opts = {}
            opts.expiresIn = 120 // token expires in 2 min
            const secret = process.env.JWT_SECRET_KEY
            const token = jwt.sign({ email }, secret, opts)
            return res.status(200).json({
                message: "Auth success",
                token
            })
        }
    }

    return res.status(401).json({ message: "Auth failed" })
}
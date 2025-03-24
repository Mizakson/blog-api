const queries = require("../utils/queries")
const bcrypt = require("bcryptjs")

exports.signUpGet = async function (req, res) {
    res.status(200).json({
        message: "Hi there from sign-up get",
    })
}

exports.signUpPost = async function (req, res) {
    res.status(200).json({
        message: "Hi there from sign-up post",
    })
}
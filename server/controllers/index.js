const commentController = require("./comment")
const signUpController = require("./signup")
const loginController = require("./login")
const postController = require("./post")

module.exports = {
    ...loginController,
    ...signUpController,
    ...postController,
    ...commentController
}
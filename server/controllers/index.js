const commentController = require("./comments")
const signUpController = require("./signup")
const loginController = require("./login")
const postController = require("./posts")

module.exports = {
    ...loginController,
    ...signUpController,
    ...postController,
    ...commentController
}
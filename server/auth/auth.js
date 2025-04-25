const queries = require("../utils/queries")
const { hashPw } = require("../utils")
const { validatePw } = require("../utils")

const signUpUser = async (username, password) => {
    const hashedPw = await hashPw(password)
    const user = await queries.createUser(user)

    return user
}

const userExists = async (username) => {
    return await queries.getUserByUsername(username)
}

const verifyUser = async (user, password) => {
    return await validatePw(password, user.password)
}

module.exports = {
    signUpUser,
    userExists,
    verifyUser
}
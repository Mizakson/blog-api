const authMethods = require("./auth")
const authMiddleware = require("./middleware")
const authPassport = require("./passport")

module.exports = {
    ...authMethods,
    ...authMiddleware,
    ...authPassport,
}
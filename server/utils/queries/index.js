const userQueries = require("./user")
const postQueries = require("./post")
const commentQueries = require("./comment")

// add all queries into one obj
module.exports = {
    ...userQueries,
    ...postQueries,
    ...commentQueries
}
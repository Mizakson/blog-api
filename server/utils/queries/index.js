const userQueries = require("./users")
const postQueries = require("./posts")
const commentQueries = require("./comments")

// add all queries into one obj
module.exports = {
    ...userQueries,
    ...postQueries,
    ...commentQueries
}
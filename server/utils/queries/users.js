const prisma = require("./prisma")

const createUser = async (username, password) => {
    const user = await prisma.user.create({
        data: {
            username: username,
            password: password
        }
    })
    return user
}

const getUserByUsername = async (username) => {
    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    })
    return user
}

module.exports = {
    createUser,
    getUserByUsername
}
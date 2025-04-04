const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

exports.createUser = async function (userData) {
    return await prisma.user.create({
        data: userData
    })
}

// email is unique along with id
exports.getUserByEmail = async function (email) {
    return await prisma.user.findFirst({
        where: {
            email: email
        }
    })
}

exports.getUserById = async function (id) {
    return await prisma.user.findUnique({
        where: {
            id: id
        }
    })
}
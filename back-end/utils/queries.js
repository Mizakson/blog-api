const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

exports.createUser = async function (userData) {
    return await prisma.user.create({
        data: userData
    })
}

exports.getUserById = async function (id) {
    return await prisma.user.findUnique(id)
}
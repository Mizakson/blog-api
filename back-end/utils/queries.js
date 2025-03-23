const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

exports.createUser = async function (userData) {
    await prisma.user.create({
        data: userData
    })
}
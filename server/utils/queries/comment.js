const prisma = require("./prisma")

const getCommentsByPostId = async (postId) => {
    const comments = await prisma.comment.findMany({
        where: {
            postId: postId,
        },
        include: {
            user: true
        }
    })
    return comments
}

const getCommentById = async (commentId) => {
    const comment = await prisma.comment.findUnique({
        where: {
            id: commentId
        }
    })
    return comment
}

const createComment = async (text, userId, postId) => {
    const comment = await prisma.comment.create({
        data: {
            text: text,
            userId: userId,
            postId: postId
        }
    })
    return comment
}

const updateComment = async (commentId, text) => {
    const comment = await prisma.comment.update({
        where: {
            id: commentId
        },
        data: {
            text: text
        }
    })
    return comment
}

const deleteComment = async (commentId) => {
    const comment = await prisma.comment.delete({
        where: {
            id: commentId
        }
    })
    return comment
}

module.exports = {
    getCommentsByPostId,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
}
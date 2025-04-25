const prisma = require("./prisma")

const getAllPosts = async () => {
    const posts = await prisma.post.findMany({
        select: {
            id: true,
            author: {
                select: {
                    username: true
                }
            },
            title: true,
            postedAt: true,
            text: true,
            state: true
        },
    })
    return posts
}

const getPostById = async (id) => {
    const post = await prisma.post.findUnique({
        where: {
            id: id
        },
        include: {
            comments: {
                include: {
                    user: {
                        select: {
                            username: true
                        }
                    }
                }
            },
            author: {
                select: {
                    username: true
                }
            }
        }
    })
    return post
}

const createPost = async (title, text, authorId, state = "UNPUBLISHED") => {
    const post = await prisma.post.create({
        data: {
            title: title,
            text: text,
            authorId: authorId,
            state: state
        }
    })
}

const updatePost = async (id, title, text, state) => {
    const post = await prisma.post.create({
        where: {
            id: id
        },
        data: {
            title: title,
            text: text,
            state: state
        }
    })
    return post
}

const deletePost = async (id) => {
    const post = await prisma.post.delete({
        where: {
            id: id
        }
    })
    return post
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}
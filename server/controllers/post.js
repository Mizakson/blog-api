const { validationResult } = require("express-validator")
const queries = require("../utils/queries")
const { validatePost } = require("../utils")

const postGetMany = async (req, res, next) => {
    try {
        const posts = await queries.getAllPosts()
        res.status(200).json(posts)
    } catch (error) {
        next(err)
    }
}

const postGetOne = async (req, res, next) => {
    const postId = req.params.postId
    try {
        const post = await queries.getPostById(postId)
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" })
        }
        res.status(200).json(post)
    } catch (error) {
        next(error)
    }
}

const postPostReq = [
    validatePost,
    async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, validationErrors: errors.array() })
        }

        const { title, text, state } = req.body
        const userId = req.user.id

        try {
            const post = await queries.createPost(title, text, userId, state)
            res.status(201).json({ success: true, post: post })
        } catch (error) {
            next(error)
        }
    }
]

const postPutReq = [
    validatePost,
    async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, validationErrors: errors.array() })
        }

        const { title, text, state } = req.body
        const postId = req.params.postId

        try {
            const post = await queries.updatePost(postId, title, text, state)
            if (!post) {
                res.status(404).json({ success: false, message: "Post not found" })
            }
            res.status(204).json({ success: true })
        } catch (error) {
            next(error)
        }
    }
]

const postDelReq = async (req, res, next) => {
    const postId = req.params.postId

    try {
        const post = await queries.deletePost(postId)

        if (!post) {
            res.status(404).json({ success: false, message: "Post not found" })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    postGetMany,
    postGetOne,
    postPostReq,
    postPutReq,
    postDelReq
}
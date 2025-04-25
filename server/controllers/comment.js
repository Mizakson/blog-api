const { validationResult } = require("express-validator")
const queries = require("../utils/queries")
const { validateComment } = require("../utils")

const commentGetMany = async (req, res, next) => {
    const postId = req.params.postId
    try {
        const comments = await queries.getCommentsByPostId(postId)
        res.status(200).json({ success: true, comments: comments })
    } catch (error) {
        next(error)
    }
}

const commentGetOne = async (req, res, next) => {
    const commentId = req.params.commentId
    try {
        const comment = await queries.getCommentById(commentId)
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" })
        }
        res.status(200).json(comment)
    } catch (error) {
        next(error)
    }
}

const commentPostReq = [
    validateComment,
    async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, validationErrors: errors.array() })
        }

        const { title, text, state } = req.body
        const userId = req.user.id

        try {
            const comment = await queries.createComment(title, text, userId, state)
            res.status(201).json({ success: true, comment: comment })
        } catch (error) {
            next(error)
        }
    }
]

const commentPutReq = [
    validateComment,
    async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, validationErrors: errors.array() })
        }

        const { title, text, state } = req.body
        const commentId = req.params.commentId

        try {
            const comment = await queries.updateComment(commentId, title, text, state)
            if (!comment) {
                res.status(404).json({ success: false, message: "Comment not found" })
            }
            res.status(204).json({ success: true })
        } catch (error) {
            next(error)
        }
    }
]

const commentDelReq = async (req, res, next) => {
    const commentId = req.params.commentId

    try {
        const comment = await queries.deleteComment(commentId)

        if (!comment) {
            res.status(404).json({ success: false, message: "Comment not found" })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    commentGetOne,
    commentGetMany,
    commentPostReq,
    commentPutReq,
    commentDelReq
}
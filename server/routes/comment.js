const { Router } = require("express")
const router = Router({ mergeParams: true })

const commentController = require("../controllers")
const { jwtAuth, checkRole } = require("../auth/middleware")

router.get("/:commentId", commentController.commentGetOne)
router.get("/", commentController.commentGetMany)

router.post("/", jwtAuth, checkRole("BASIC"), commentController.commentPostReq)

// author
router.use(jwtAuth, checkRole("ADMIN"))
router.put("/:commentId", commentController.commentPutReq)
router.delete("/:commentId", commentController.commentDelReq)

module.exports = router
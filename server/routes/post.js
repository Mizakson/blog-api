const { Router } = require("express")
const router = Router({ mergeParams: true })

const commentRouter = require("./comment")
const postController = require("../controllers")
const { jwtAuth, checkRole } = require("../auth/middleware")

router.use("/:postId/comments", commentRouter)

router.get("/", postController.postGetMany)
router.get("/:postId", postController.postGetOne)

// admin
router.use(jwtAuth, checkRole("ADMIN"))
router.post("/", postController.postPostReq)
router.put("/:postId", postController.postPutReq)
router.delete("/:postId", postController.postDelReq)

module.exports = router
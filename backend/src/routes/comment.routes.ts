import { Router } from "express";
import { authenticate } from "../middleware/auth/authenticate.ts";
import { softDeleteComment, editComment, listComments, createComment } from "../controllers/comment.controller.ts";
import { getThread } from "../controllers/thread.controller.ts";

const commentRouter = Router();

commentRouter.patch("/:commentId/delete", authenticate, softDeleteComment);
commentRouter.patch("/:commentId", authenticate, editComment);

export default commentRouter;

// Comment-thread routes (mounted at /comment-threads in app.ts)
export const commentThreadRouter = Router();
commentThreadRouter.get("/:threadId", authenticate, getThread);
commentThreadRouter.get("/:threadId/comments", authenticate, listComments);
commentThreadRouter.post("/:threadId/comments", authenticate, createComment);

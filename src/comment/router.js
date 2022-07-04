import express from "express";
import CommentController from "./controller";

const router = express.Router();

router.post("/submit", CommentController.createComment);

router.get("/:id", CommentController.getComment);

export default router;

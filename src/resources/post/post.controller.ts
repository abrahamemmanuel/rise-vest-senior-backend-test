import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import Validator from "@/middleware/validation.middleware";
import createCommentValidator from "@/resources/post/post.validation";
import CommentService from "@/resources/comment/comment.service";
import PostService from "@/resources/post/post.service";
import UserService from "@/resources/user/user.service";
import { User } from "@/resources/user/user.entity";
import { Post } from "@/resources/post/post.entity";

class PostController implements Controller {
	public path = "/posts";
	public router = Router();

	constructor() {
		this.initialiseRoutes();
	}

	private initialiseRoutes(): void {
		this.router.post(
			`${this.path}/:postId/comments`,
			this.createComment,
		);
	}

	private createComment = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | void> => {
		try {
			const content: string = req.body;
			const postId: string = req.params.postId;
			const post: Post | null = await PostService.getPostById(postId);
			if (!post) return next(new HttpException(404, `Post with ${postId} not found`));
			const user: User | null = post?.user;
			const comment = await CommentService.createComment({
				user: user,
				post: post,
				content: content,
			});
			return res.status(201).json({
				success: true,
				data: comment,
			});
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	};
}

export default PostController;

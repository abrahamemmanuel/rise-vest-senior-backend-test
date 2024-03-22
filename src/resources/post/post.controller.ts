import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import CommentService from "../comment/comment.service";
import PostService from "../post/post.service";
import { User } from "../user/user.entity";
import { Post } from "../post/post.entity";

class PostController implements Controller {
	public path = "/posts";
	public router = Router();

	constructor() {
		this.initialiseRoutes();
	}

	private initialiseRoutes(): void {
		this.router.post(`${this.path}/:postId/comments`, this.createComment);
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

import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import Validator from '@/middleware/validation.middleware';
import createCommentValidator from '@/resources/post/post.validation';
import CommentService from '@/resources/comment/comment.service';

class PostController implements Controller {
	public path = '/posts';
	public router = Router();

	constructor() {
		this.initialiseRoutes();
	}

	private initialiseRoutes(): void {
		this.router.post(
			`${this.path}/:postId/comments`,
			Validator.validate(createCommentValidator),
			this.createComment,
		);
	}

	private createComment = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | void> => {
		try {
			const {
				post,
				user,
				body: { content },
			} = req;

			const comment = await CommentService.createComment({
				post,
				user,
				content,
			});
			return res.status(200).json(comment);
		} catch (error: any) {
			next(new HttpException(400, error.message));
		}
	};
}

export default PostController;

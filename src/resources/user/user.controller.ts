import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import Validator from '@/middleware/validation.middleware';
import createUserValidator from '@/resources/user/user.validation';
import createPostValidator from '@/resources/post/post.validation';
import UserService from '@/resources/user/user.service';
import PostService from '@/resources/post/post.service';
import { CreateUserType } from '@/resources/user/user.interface';
import { CreatePostType } from '@/resources/post/post.interface';

class UserController implements Controller {
	public path = '/users';
	public router = Router();

	constructor() {
		this.initialiseRoutes();
	}

	private initialiseRoutes(): void {
		this.router.post(
			`${this.path}`,
			Validator.validate(createUserValidator),
			this.create,
		);

		this.router.post(
			`${this.path}/:id/posts`,
			Validator.validate(createPostValidator),
			this.createPost,
		);

		this.router.get(`${this.path}`, this.getUsers);

		this.router.get(`${this.path}/:id/posts`, this.getUserPosts);
	}

	private create = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | void> => {
		try {
			const body = <CreateUserType>req.body;
			const user = await UserService.createUser(body);
			return res.status(201).json(user);
		} catch (error: any) {
			return next(new HttpException(400, error.message));
		}
	};

	private getUsers = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | void> => {
		try {
			const users = await UserService.getAllUsers();
			return res.status(200).json({
				users,
			});
		} catch (error: any) {
			return next(new HttpException(400, error.message));
		}
	};

	private createPost = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | void> => {
		try {
			const body = <CreatePostType>req.body;
			const post = await PostService.createPost({
				...body,
				user: req.user,
			});
			return res.status(201).json(post);
		} catch (error: any) {
			return next(new HttpException(400, error.message));
		}
	};

	private getUserPosts = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | void> => {
		try {
			const body = <CreatePostType>req.body;
			const post = await PostService.createPost({
				...body,
				user: req.user,
			});
			return res.status(200).json(post);
		} catch (error: any) {
			return next(new HttpException(400, error.message));
		}
	};
}

export default UserController;

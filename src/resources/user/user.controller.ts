import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import Validator from '@/middleware/validation.middleware';
import createUserValidator from '@/resources/user/user.validation';
import createPostValidator from '@/resources/post/post.validation';
import { User } from '@/resources/user/user.interface';
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
			return res.status(201).json({
				sucess: true,
				data: user,
			});
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
				success: true,
				count: users.length,
				data: users,
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
			let id: string = req.params.id;
			const user = await UserService.getUserByIdOrFail(id);
			if (!user)
				return next(
					new HttpException(404, `User with ${id} not found`),
				);
			const post = await PostService.createPost({
				...body,
				user: user,
			});
			return res.status(201).json({
				succes: true,
				data: post,
			});
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
			let id: string = req.params.id;
			const posts = await PostService.getUserPosts(id);
			if (!posts)
				return next(
					new HttpException(404, `User with ${id} not found`),
				);
			return res.status(200).json({
				success: true,
				data: posts,
			});
		} catch (error: any) {
			return next(new HttpException(400, error.message));
		}
	};
}

export default UserController;

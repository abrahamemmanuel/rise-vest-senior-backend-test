import { Repository } from "typeorm";
import { Post } from "@/resources/post/post.entity";
import { CreatePostType } from "@/resources/post/post.interface";
import handleGetRepository from "@/config/db.connection.config";

export class PostService {
	constructor(private postRepository: Repository<Post>) {}

	async createPost(data: CreatePostType): Promise<Post> {
		const post = await this.postRepository
			.create({
				user: data.user,
				title: data.title,
				content: data.content,
			})
			.save();
		return post;
	}

	async getUserPosts(userId: string): Promise<Post[]> {
		const posts = await this.postRepository.find({
			where: {
				user: {
					id: Number(userId),
				},
			},
		});
		return posts;
	}

	async getPostById(id: string): Promise<Post | null> {
		const post = await this.postRepository.findOne({
			where: {
				id: Number(id),
			},
		});
		return post;
	}
}

export default new PostService(handleGetRepository(Post));

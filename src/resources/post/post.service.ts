import { Repository } from 'typeorm';
import { Post } from '@/resources/post/post.entity';
import { CreatePostType } from '@/resources/post/post.interface';
import HttpException from '@/utils/exceptions/http.exception';
import handleGetRepository from '@/config/db.connection.config';

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

	async getUserPosts(userId: number): Promise<Post[]> {
		const posts = await this.postRepository.find({
			where: {
				user: {
					id: userId,
				},
			},
		});
		return posts;
	}
}

export default new PostService(handleGetRepository(Post));

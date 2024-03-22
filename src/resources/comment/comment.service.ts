import { Repository } from "typeorm";
import handleGetRepository from "../../config/db.connection.config";
import { Comment } from "../comment/comment.entity";
import { CreateCommentType } from "../comment/comment.interface";

export class CommentService {
	constructor(private commentRepository: Repository<Comment>) {}

	async createComment({ user, post, content }: CreateCommentType): Promise<Comment> {
		const newComment = await this.commentRepository
			.create({
				user,
				post,
				content,
			})
			.save();
		return newComment;
	}
}

export default new CommentService(handleGetRepository(Comment));

import { Post } from "../post/post.entity";
import { User } from "../user/user.entity";

export type CreateCommentType = {
	user: User;
	post: Post;
	content: string;
};

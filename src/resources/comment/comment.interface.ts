import { Post } from "@/resources/post/post.entity";
import { User } from "@/resources/user/user.entity";

export type CreateCommentType = {
	user: User;
	post: Post;
	content: string;
};

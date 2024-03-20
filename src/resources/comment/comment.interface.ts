import { Post } from '@/resources/post/post.entity';
import { User } from '@/resources/user/user.entity';

export type CreateCommentType = {
	content: string;
	post: Post;
	user: User;
};

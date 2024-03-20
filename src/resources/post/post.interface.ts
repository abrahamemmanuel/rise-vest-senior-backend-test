import { User } from '@/resources/user/user.entity';

export type CreatePostType = {
	title: string;
	content: string;
	user: User;
};

import { User } from "../user/user.entity";

export type CreatePostType = {
	title: string;
	content: string;
	user: User;
};

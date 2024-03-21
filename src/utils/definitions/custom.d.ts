import User from "@/resources/user/user.entity";
import Post from "@/resources/post/post.entity";

declare global {
	namespace Express {
		export interface Request {
			user: User;
			post: Post;
		}
	}
}

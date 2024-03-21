import { Repository } from "typeorm";
import { User } from "@/resources/user/user.entity";
import { CreateUserType } from "@/resources/user/user.interface";
import HttpException from "@/utils/exceptions/http.exception";
import handleGetRepository from "@/config/db.connection.config";

export class UserService {
	constructor(private userRepository: Repository<User>) {}

	async createUser(data: CreateUserType): Promise<User> {
		if (await this.doesUserExistByEmail(data.email)) {
			throw new HttpException(400, "User with email already exists");
		}
		const user = await this.userRepository.create({ email: data.email, name: data.name }).save();

		return user;
	}

	async doesUserExistByEmail(email: string): Promise<boolean> {
		const user = await this.userRepository.findOne({
			where: {
				email,
			},
		});
		return !!user;
	}

	async getAllUsers(): Promise<User[]> {
		const users = await this.userRepository.find({
			order: {
				createdAt: "DESC",
			},
		});
		return users;
	}

	async getUserById(userId: string): Promise<User | null> {
		const user = await this.userRepository.findOne({
			where: {
				id: Number(userId),
			},
		});
		return user;
	}

	async getUserByIdOrFail(userId: string): Promise<User> {
		const user = await this.getUserById(userId);
		if (!user) {
			throw new HttpException(404, "User not found");
		}
		return user;
	}
	async getTopUsersWithLatestComment(limit: string) {
		const topUsersWithLatestComment = await this.userRepository.query(
			`
			SELECT 
				u.id AS user_id,
				u.name AS user_name,
				p.title AS post_title,
				c.content AS latest_comment
			FROM (
					SELECT 
							userId,
							MAX(created_at) AS latest_comment_date
					FROM 
							Comments
					GROUP BY 
							userId
			) AS latest_comments
			INNER JOIN Users u ON latest_comments.userId = u.id
			INNER JOIN Comments c ON latest_comments.userId = c.userId AND latest_comments.latest_comment_date = c.created_at
			LEFT JOIN (
					SELECT 
							userId,
							COUNT(*) AS post_count
					FROM 
							Posts
					GROUP BY 
							userId
					ORDER BY 
							post_count DESC
					LIMIT $1
			) AS top_users ON u.id = top_users.userId
			LEFT JOIN Posts p ON u.id = p.userId
			ORDER BY 
					top_users.post_count DESC;
		`,
			[limit],
		);
		return topUsersWithLatestComment;
	}
}

export default new UserService(handleGetRepository(User));

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
		const users = await this.userRepository.find();
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
    SELECT f.*, p."content" post, u."name" FROM (SELECT 
      top_users.*,
      c."content" "comment", 
      c."postId",
      c.id "commentId"
    FROM (
      SELECT
        "userId", 
        COUNT("Posts"."userId") post_count
      from 
        "Posts" 
      GROUP BY
        "Posts"."userId" 
      ORDER BY 
        post_count 
      DESC limit $1
    ) top_users
    LEFT JOIN
      "Comments" c
    ON 
      top_users."userId" = c."userId"
    WHERE
      c.created_at = (
        SELECT
          MAX("Comments".created_at) AS max_date
        FROM
          "Comments"
        WHERE
          "Comments"."userId" = top_users."userId"
      )) f
      
    LEFT JOIN
      "Posts" p
    ON
      f."postId" = p.id
    LEFT JOIN 
      "Users" u 
    ON 
      f."userId" = u.id
    ORDER BY
      f.post_count DESC
    `,
			[limit],
		);
		return topUsersWithLatestComment;
	}
}

export default new UserService(handleGetRepository(User));

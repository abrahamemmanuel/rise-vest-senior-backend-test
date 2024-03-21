import "reflect-metadata";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
	BaseEntity,
} from "typeorm";
import { Post } from "@/resources/post/post.entity";
import { User } from "@/resources/user/user.entity";

@Entity("Comments")
export class Comment extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => Post, (post) => post.comments)
	post!: Post;

	@ManyToOne(() => User, (user) => user.comments)
	user!: User;

	@Column("text", { nullable: true })
	content?: string;

	@CreateDateColumn({
		type: "timestamptz",
		default: () => "CURRENT_TIMESTAMP",
		name: "created_at",
	})
	createdAt!: Date;
}

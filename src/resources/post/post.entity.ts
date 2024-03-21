import "reflect-metadata";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
	OneToMany,
	BaseEntity,
} from "typeorm";
import { User } from "@/resources/user/user.entity";
import { Comment } from "@/resources/comment/comment.entity";

@Entity("Posts")
export class Post extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ length: 200, nullable: false })
	title!: string;

	@Column("text", { nullable: true })
	content?: string;

	@ManyToOne(() => User, (user) => user.posts)
	user!: User;

	@OneToMany(() => Comment, (comment) => comment.post)
	comments?: Comment[];

	@CreateDateColumn({
		type: "timestamptz",
		default: () => "CURRENT_TIMESTAMP",
		name: "created_at",
	})
	createdAt!: Date;
}

import 'reflect-metadata';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	Index,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from '@/resources/comment/comment.entity';
import { Post } from '@/resources/post/post.entity';

@Entity('Users')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn({
		type: 'int',
		primaryKeyConstraintName: 'IDX_users_id',
	})
	id!: number;

	@Column('varchar')
	name!: string;

	@Column({ type: 'varchar' })
	@Index('IDX_users_email', { unique: true })
	email!: string;

	@OneToMany(() => Post, (post) => post.user)
	posts?: Post[];

	@OneToMany(() => Comment, (comment: Comment) => comment.user)
	comments!: Comment[];

	@CreateDateColumn({
		type: 'timestamptz',
		default: () => 'CURRENT_TIMESTAMP',
		name: 'created_at',
	})
	createdAt!: Date;
}

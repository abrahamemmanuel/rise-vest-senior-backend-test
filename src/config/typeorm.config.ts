import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';
import { User } from '@/resources/user/user.entity';
import { Post } from '@/resources/post/post.entity';
import { Comment } from '@/resources/comment/comment.entity';
import { CreateUserPostCommentTables1711013801973 } from '@/migrations/1711013801973-CreateUserPostCommentTables';

const isDev = process.env.NODE_ENV === 'development';

const dataSource: DataSource = new DataSource({
	type: 'postgres',
	url: process.env.DB_URL,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT) || 5432,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE_NAME,
	entities: [User, Post, Comment],
	synchronize: false,
	logging: isDev,
	migrationsRun: true,
	migrations: [CreateUserPostCommentTables1711013801973],
	ssl: {
		rejectUnauthorized: false,
	},
});

export default dataSource;

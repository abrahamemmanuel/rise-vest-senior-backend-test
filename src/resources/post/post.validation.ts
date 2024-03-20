import { body } from 'express-validator';

const createPostValidator = [
	body('title', 'Title of post')
		.isLength({
			min: 1,
			max: 200,
		})
		.exists()
		.trim()
		.escape(),
	body('content', 'Post content')
		.isLength({
			min: 0,
			max: 2000,
		})
		.default('')
		.trim()
		.escape(),
];

export default createPostValidator;

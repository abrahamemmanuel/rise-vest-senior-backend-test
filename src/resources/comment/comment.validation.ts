import { body } from 'express-validator';

export const createCommentValidator = [
	body('content', 'comment content')
		.isLength({
			min: 0,
			max: 2000,
		})
		.default('')
		.trim()
		.escape(),
];

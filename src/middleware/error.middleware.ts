import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';

function errorMiddleware(
	error: HttpException,
	req: Request,
	res: Response,
	_next: NextFunction,
): void {
	const status = error.status || 500;
	const message = error.message || 'Internal server error';
	res.status(status).send({
		status,
		message,
	});
}

export default errorMiddleware;

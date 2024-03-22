import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { ContextRunner } from "express-validator/src/chain";
import HttpException from "../utils/exceptions/http.exception";

const Validator = {
	validate: (validations: ContextRunner[]) => {
		return async (req: Request, res: Response, next: NextFunction) => {
			await Promise.all(validations.map((validation: ContextRunner) => validation.run(req)));

			const errors = validationResult(req);
			const msg = errors.array().map((error) => error.msg);

			if (errors.isEmpty()) return next();
			return new HttpException(400, msg.join(", "));
		};
	},
};

export default Validator;

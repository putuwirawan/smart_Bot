import { NextApiRequest, NextApiResponse } from "next";
import { Request, Response } from "express";
import * as errors from "../helpers/error";

type NextApiRequestWithFormData = NextApiRequest &
	Request & {
		user: any;
	};

const withRoles = (handler: any, ...roles: any) => {
	return async (req: NextApiRequestWithFormData, res: NextApiResponse) => {
		// Roles in an array

		if (!roles.includes(req.user.role)) {
			return errors.errorHandler(
				res,
				"You do not have permission to perform this action.",
				"invalid role"
			);
		}

		return handler(req, res);
	};
};

export default withRoles;

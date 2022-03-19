const bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { Request, Response } from "express";
import { User } from "../db/models";
import * as errors from "../helpers/error";
import { IUser } from "../types/user.type";

type NextApiRequestWithFormData = NextApiRequest &
	Request & {
		user: any;
	};

type NextApiResponseCustom = NextApiResponse & Response;

const withProtect = (handler: any) => {
	return (req: NextApiRequestWithFormData, res: NextApiResponse) => {
		// Get token and check if it exists
		const token =
			req.body.token ||
			req.query.token ||
			req.headers["x-access-token"] ||
			req.headers.authorization;

		if (!token) {
			return errors.errorHandler(
				res,
				"token is required for authentication",
				"invalidToken"
			); // res.status(403).send("A token is required for authentication");
		}
		let _token = token.split(" ")[1];
		try {
			// Verify token
			const Secret = process.env.JWT_SECRET || "";
			const decoded: any = jwt.verify(_token, Secret);

			const { email, id, exp } = decoded;
			if (exp && exp < (new Date().getTime() + 1) / 1000) {
				return errors.errorHandler(res, "expired Token", "invalidToken");
			}

			// Check if user exists with refresh token
			User.findOne({ email })
				.then((user: IUser) => {
					// ceck User				
					if (user && user._id == id) {
						if (user.active) {
							req.user = user;
							return handler(req, res);
						} else {
							return errors.errorHandler(res, "Not Active User", null);
						}
					} else {
						return errors.errorHandler(
							res,
							"Invalid Credentials",
							"invalidToken"
						);
					}
				})
				.catch((error: any) => {
				
					return errors.errorHandler(res, "internal server error", null);
				});
		} catch (error) {
			return res.status(401).json({
				success: false,
				message: "Please log in to get access.",
			});
		}
	};
};

export default withProtect;

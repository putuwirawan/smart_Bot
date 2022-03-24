import type { NextApiRequest, NextApiResponse } from "next";
import * as errors from "../../../../helpers/error";
import dbConnect from "../../../../db/config/DbConnect";
import { User } from "../../../../db/models";

import sendEmail from "../../../../services/sendEmail";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

type DataResfonse = {
	success: boolean;
	message?: string;
	data?: any;
};

dbConnect();
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<DataResfonse>
) {
	const method = req.method;
	const { email, password } = req.body;
	if (method !== "POST") {
		return errors.errorHandler(res, "req_method_not_supported", null);
	}

	if (email && password) {
		const getUser = await User.findOne({ email }).exec();
		if (getUser) {
			return errors.errorHandler(res, "email already registered", null);
		} else {
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(password, salt);
			try {
				// Hash password to store it in DB
				const newUser = new User({
					password: hash,
					email: email,
				});
				// Create new user
				var usercreated = await newUser.save();

				const token = jwt.sign(
					{ _id: usercreated._id, email: usercreated.email },
					process.env.JWT_SECRET,
					{
						expiresIn: "5d", // 1 hour
					}
				);

				if (usercreated) {
					//sendEmail(res, email, token);
					return res
						.status(200)
						.send({
							success: true,
							message: "contact your admin to activated your account",
						});
				}
			} catch (error: any) {
				return errors.errorHandler(res, error.message, null);
			}
		}
	} else {
		return errors.errorHandler(res, "data_incomplete", null);
	}
}

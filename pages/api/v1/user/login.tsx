// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as errors from "../../../../helpers/error";
import dbConnect from "../../../../db/config/DbConnect";
import { User } from "../../../../db/models";
import { IUser } from "../../../../types/user.type";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

type Data = {
	success: boolean;
	message?: string;
	token?: string;
	data?: any;
};

dbConnect();
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const method = req.method;
	const { email, password } = req.body;
	if (method !== "POST") {
		return errors.errorHandler(res, "req_method_not_supported", null);
	}

	if (email && password) {
		const getUser: IUser = await User.findOne({ email }).exec();
		if (!getUser) {
			return errors.errorHandler(res, "please register your account", null);
		} else {
			try {
				const genPassword = getUser.password;
				const match = bcrypt.compareSync(password, genPassword);
				if (match) {
					const token = jwt.sign(
						{ id: getUser._id, email: getUser.email, role: getUser.role },
						process.env.JWT_SECRET,
						{
							expiresIn: "7d",
						}
					);
					return res.status(200).send({ success: true, token: token });
				} else {
					return errors.errorHandler(res, "email and password not match", null);
				}
			} catch (error: any) {
				return errors.errorHandler(res, error.message, null);
			}
		}
	} else {
		return errors.errorHandler(res, "data_incomplete", null);
	}
}

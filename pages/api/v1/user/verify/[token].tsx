// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as errors from "../../../../../helpers/error";
import dbConnect from "../../../../../db/config/DbConnect";
import { User } from "../../../../../db/models";

const jwt = require("jsonwebtoken");

type Data = {
	message: string;
};

dbConnect();
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	
	const { token } = req.query;
	const parseToken = jwt.verify(token, process.env.JWT_SECRET);
	
	if (parseToken) {
		const updateUser = await User.findByIdAndUpdate(parseToken._id, {
			role: "member",
		}).exec();
		if (updateUser) {
			return res.status(200).send({ message: "Succes Active Account" });
		} else {
			errors.errorHandler(res, "Failled Active Account", null);
		}
	} else {
		return res.status(500).send({ message: "failled" });
	}
}

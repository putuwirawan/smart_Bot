// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "../../../types/user.type";

type NextApiRequestWithFormData = NextApiRequest &
	Request & {
		user: IUser;
	};

type NextApiResponseCustom = NextApiResponse & Response;

type DataResfonse = {
	success: boolean;
	message?: string;
	data?: any;
};

const handler = (req: NextApiRequest, res: NextApiResponse<DataResfonse>) => {
	const { APP_KEY } = process.env;
	const { ACTION_KEY } = req.headers;
	console.log(ACTION_KEY);
	try {
        console.log("kopi susu")
		res.status(200).json({ success: true });
	} catch (err) {
		res.status(500);
	}
};
export default handler;

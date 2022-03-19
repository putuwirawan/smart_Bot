// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import withProtect from "../../../../../middleware/withProtect";
import * as errors from "../../../../../helpers/error";
import dbConnect from "../../../../../db/config/DbConnect";
import { TkoAcountBalance } from "../../../../../services/TokoCrypto.service";
import { IUser } from "../../../../../types/user.type";
import connectToko from "../../../../../middleware/connectToko";
const jwt = require("jsonwebtoken");

type NextApiRequestWithFormData = NextApiRequest &
	Request & {
		user: IUser;
		apikey: string;
	};

type NextApiResponseCustom = NextApiResponse & Response;

type DataResfonse = {
	success: boolean;
	message?: string;
	data?: any;
};
dbConnect();
const handler = async (
	req: NextApiRequestWithFormData,
	res: NextApiResponse<DataResfonse>
) => {

	const method = req.method;
	const apikey = req.apikey;

	let tkoKey = "";
	if (method == "GET") {
		if (apikey) {
			const api = jwt.verify(apikey, process.env.JWT_SECRET);

			const balance = await TkoAcountBalance({ baseAsset: "ADA", api: api });
			if (balance) {
				return res.status(200).send({ success: true, data: balance });
			} else {
				return errors.errorHandler(res, "invalid apiKey and secretKey", null);
			}
		} else {
			return errors.errorHandler(res, "Exchange not Available", null);
		}
	} else {
		return errors.errorHandler(res, "req_method_not_supported", null);
	}
};
export default withProtect(connectToko(handler));

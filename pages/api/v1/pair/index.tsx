import type { NextApiRequest, NextApiResponse } from "next";
import { Pair } from "../../../../db/models";
import dbConnect from "../../../../db/config/DbConnect";

import withProtect from "../../../../middleware/withProtect";
import * as errors from "../../../../helpers/error";
import { IPair } from "../../../../types/Pair.type";

type NextApiRequestWithFormData = NextApiRequest &
	Request & {
		user: any;
	};

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
	if (method === "GET") {
		try {
			const pair: IPair[] = await Pair.find();
			return res.status(200).send({ success: true, data: pair });
		} catch (error: any) {
			return errors.errorHandler(res, error.message, null);
		}
	} else {
		return errors.errorHandler(res, "method not allowed", null);
	}
};
export default withProtect(handler);

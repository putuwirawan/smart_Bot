import type { NextApiRequest, NextApiResponse } from "next";
import { Exchange } from "../../../../db/models";
import dbConnect from "../../../../db/config/DbConnect";

import withProtect from "../../../../middleware/withProtect";
import * as errors from "../../../../helpers/error";

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
			const exchange = await Exchange.find();
			return res.status(200).send({ success: true, data: exchange });
		} catch (error: any) {
			return errors.errorHandler(res, error.message, null);
		}
	} else {
		return errors.errorHandler(res, "method not allowed", null);
	}
};
export default withProtect(handler);

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import withProtect from "../../../../../middleware/withProtect";
import * as errors from "../../../../../helpers/error";
import dbConnect from "../../../../../db/config/DbConnect";
import {
	Requestorder,
} from "../../../../../db/models";
import connectToko from "../../../../../middleware/connectToko";

type NextApiRequestWithFormData = NextApiRequest &
	Request & {
		user: any;
		apikey: string;
	};

type NextApiResponseCustom = NextApiResponse & Response;

type DataResfonse = {
	success: boolean;
	message?: string;
	data?: any;
	code?: string;
};
dbConnect();
const handler = async (
	req: NextApiRequestWithFormData,
	res: NextApiResponse<DataResfonse>
) => {
	const method = req.method;
	const { id } = req.query;

	switch (method) {
		case "DELETE": {
			try {
				const request = await Requestorder.findByIdAndRemove(id).exec();
				return res.status(200).send({ success: true, data: request });
			} catch (error: any) {
				return errors.errorHandler(res, error.message, null);
			}
		}
		case "GET": {
			try {
				const request = await Requestorder.findById(id)
					.populate("exchangeId")
					.populate("pairId")
					.exec();
				return res.status(200).send({ success: true, data: request });
			} catch (error: any) {
				return errors.errorHandler(res, error.message, null);
			}
		}

		default:
			return errors.errorHandler(res, "method not allowed", null);
	}
};
export default withProtect(connectToko(handler));

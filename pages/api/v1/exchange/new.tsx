import type { NextApiRequest, NextApiResponse } from "next";
import { IExchange } from "../../../../types/Exchange.type";
import { Exchange } from "../../../../db/models";
import dbConnect from "../../../../db/config/DbConnect";
import withProtect from "../../../../middleware/withProtect";
import * as errors from "../../../../helpers/error";
import withRoles from "../../../../middleware/withRoles";

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
const handler = (
	req: NextApiRequestWithFormData,
	res: NextApiResponse<DataResfonse>
) => {
	const method = req.method;
	if (method === "POST") {
		const body: IExchange = req.body;
		try {
			const _exc = {
				name: body.name,
				code: body.code.trimEnd().toLowerCase(),
				currency: body.currency,
				url: body.url ? body.url : `/${body.code}.png`,
			};
			const newExchange = new Exchange(_exc);
			newExchange.save((err: any, result: IExchange) => {
				if (result) {
					return res.status(200).send({ success: true, data: result });
				}
				if (err) {
					return errors.errorHandler(res, err.message, null);
				}
			});
		} catch (error: any) {
			return errors.errorHandler(res, error.message, null);
		}
	} else {
		return errors.errorHandler(res, "method not allowed", null);
	}
};
export default withProtect(withRoles(handler, "admin"));

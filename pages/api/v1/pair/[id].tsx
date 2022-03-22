import type { NextApiRequest, NextApiResponse } from "next";
import { Pair } from "../../../../db/models";
import dbConnect from "../../../../db/config/DbConnect";
import withProtect from "../../../../middleware/withProtect";
import * as errors from "../../../../helpers/error";
import withRoles from "../../../../middleware/withRoles";
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
const handler = (
	req: NextApiRequestWithFormData,
	res: NextApiResponse<DataResfonse>
) => {
	const method = req.method;
	const { id } = req.query;
	if (method == "DELETE") {
		{
			try {
				Pair.findByIdAndRemove(id).exec((err: any, result: IPair) => {
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
		}
	}
};
export default withProtect(withRoles(handler, "admin"));

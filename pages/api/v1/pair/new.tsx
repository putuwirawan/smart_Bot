// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Pair } from "../../../../db/models";
import dbConnect from "../../../../db/config/DbConnect";
import withProtect from "../../../../middleware/withProtect";
import * as errors from "../../../../helpers/error";
import withRoles from "../../../../middleware/withRoles";
import { PairInfo } from "../../../../services/generalEndPoint";
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
	if (method === "POST") {
		const symbol: string = req.body.symbol;

		try {
			PairInfo(symbol.toUpperCase())
				.then((info) => {
					if (info) {
						const _newPair: IPair = {
							symbol: info.symbol,
							baseAsset: info.baseAsset,
							quoteAsset: info.quoteAsset,
							minOrder: info.minOrder.toString(),
							minQty: info.minQty.toString(),
							url: `/crypto/${info.baseAsset}.png`,
						};
						const newPair = new Pair(_newPair);
						newPair.save((err: any, result: IPair) => {
							if (result) {
								return res.status(200).send({ success: true, data: result });
							}
							if (err) {
								return errors.errorHandler(res, err.message, null);
							}
						});
					} else {
						return errors.errorHandler(res, "invalid pair symbol", null);
					}
				})
				.catch((err: any) => {
					return errors.errorHandler(res, err.message, null);
				});
		} catch (error: any) {
			return errors.errorHandler(res, error.message, null);
		}
	} else {
		return errors.errorHandler(res, "method not allowed", null);
	}
};
export default withProtect(withRoles(handler, "admin"));

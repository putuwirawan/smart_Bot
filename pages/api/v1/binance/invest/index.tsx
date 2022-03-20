// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import withProtect from "../../../../../middleware/withProtect";
import * as errors from "../../../../../helpers/error";
import dbConnect from "../../../../../db/config/DbConnect";
import {
	Coininvest,
} from "../../../../../db/models";
import { IExchange } from "../../../../../types/Exchange.type";
import { IUser } from "../../../../../types/user.type";
import connectBinance from "../../../../../middleware/connectBinance";

type NextApiRequestWithFormData = NextApiRequest &
	Request & {
		user: IUser;
		apikey: string;
		exchange: IExchange;
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
	const user = req.user;
	const method = req.method;
	const exchange = req.exchange;
	if (exchange) {
		switch (method) {
			case "GET": {
				try {
					const invest = await Coininvest.aggregate([
						{ $match: { userId: user._id, exchangeId: exchange._id } },
						{
							$group: {
								_id: "$pairId",
								userId: { $first: "$userId" },
								exchangeId: { $first: "$exchangeId" },
								orders: {
									$push: {
										order: "$order",
										_id: "$_id",
										createdAt: "$createdAt",
									},
								},
							},
						},
						{
							$lookup: {
								from: "pairs",
								localField: "_id",
								foreignField: "_id",
								as: "pairId",
							},
						},
						{
							$lookup: {
								from: "exchanges",
								localField: "exchangeId",
								foreignField: "_id",
								as: "exchangeId",
							},
						},
					]);

					return res.status(200).send({ success: true, data: invest });
				} catch (error: any) {
					return errors.errorHandler(res, error.message, null);
				}
			}

			default:
				return errors.errorHandler(res, "req_method_not_supported", null);
		}
	} else {
		return errors.errorHandler(res, "Exchange not Available", null);
	}
};
export default withProtect(connectBinance(handler));

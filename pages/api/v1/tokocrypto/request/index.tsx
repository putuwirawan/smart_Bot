// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import withProtect from "../../../../../middleware/withProtect";
import * as errors from "../../../../../helpers/error";
import dbConnect from "../../../../../db/config/DbConnect";
import { Requestorder } from "../../../../../db/models";
import connectToko from "../../../../../middleware/connectToko";
import { IExchange } from "../../../../../types/Exchange.type";
import { IUser } from "../../../../../types/user.type";
import { IOrder } from "../../../../../types/Order.type";

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
	code?: string;
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
				const requestOrder = await Requestorder.find({
					userId: user._id,
					exchangeId: exchange._id,
				})
					.populate("exchangeId")
					.populate("pairId")
					.sort({ createdAt: -1 })
					.exec();

				return res.status(200).send({ success: true, data: requestOrder });
			}
			case "POST": {
				let body: IOrder = req.body;
				body.userId = user._id;
				body.exchangeId = exchange._id;
				try {
					const newOrder = new Requestorder(body);

					const order = await newOrder.save();
					return res.status(200).send({ success: true, data: order });
				} catch (error: any) {
					return errors.errorHandler(res, error.message, null);
				}
			}
			case "DELETE": {
				try {
					const deletedOrder = await Requestorder.deleteMany({
						userId: user._id,
						exchangeId: exchange._id,
					}).exec();

					return res.status(200).send({ success: true, data: deletedOrder });
				} catch (error: any) {
					return errors.errorHandler(res, error.message, null);
				}
			}

			default:
				return errors.errorHandler(res, "method not allowed", null);
		}
	} else {
		return errors.errorHandler(res, "no available data Exchange", null);
	}
};
export default withProtect(connectToko(handler));
